import {
  InvalidCountError,
  LexoRankArgumentTypeError,
  NotEqualBucketsError,
  Rank0IsNotLessThanRank1Error,
  RankLengthsAreNotEqualError,
} from '@/errors';
import type { Bucket, LexoRank, RebalancingInfo } from '@/types';

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type LexoRankData = Mutable<
  Pick<LexoRank, 'bucket' | 'rank' | 'subrank'>
>;

const radix = 36;
const radixBigInt = 36n;
const radixPow10 = 3656158440062976n; // radixBigInt ** 10n

function parseBase36String(str: string) {
  let end = str.length;

  if (end === 0) return 0n;

  const start = end - 10;
  let result = BigInt(parseInt(str.substring(end - 10, end), radix));
  end = start;

  if (end <= 0) return result;

  let mult = radixPow10;

  for (;;) {
    const start = end - 10;
    result += BigInt(parseInt(str.substring(start, end), radix)) * mult;
    end = start;
    if (end <= 0) return result;
    mult *= radixPow10;
  }
}

function validateArgs(
  min: LexoRank | 'min',
  max: LexoRank | 'max',
  count: number,
): {
  bucket: Bucket;
  rank0: bigint;
  rank1: bigint;
  rankDigitsCount: number;
  subrankLength: bigint;
} {
  if (!Number.isInteger(count) || count < 1) {
    throw new InvalidCountError(count);
  }

  if (min === 'min') {
    if (max === 'max') {
      throw new LexoRankArgumentTypeError(
        `At least one of the arguments \`min\` or \`max\` are expected to be LexoRanks, ` +
          `but got ${JSON.stringify(min)} and ${JSON.stringify(max)}`,
      );
    }

    const bucket = max.bucket;
    const rankDigitsCount = max.rank.length;
    const subrankLength = BigInt(max.subrank.length);
    const rank0 = 0n;
    const rank1 = parseBase36String(max.rank + max.subrank);

    return { bucket, rank0, rank1, rankDigitsCount, subrankLength };
  }

  if (max === 'max') {
    const bucket = min.bucket;
    const rankDigitsCount = min.rank.length;
    const subrankLength = BigInt(min.subrank.length);
    const rank0 = parseBase36String(min.rank + min.subrank);
    const rank1 = 36n ** (BigInt(rankDigitsCount) + subrankLength);

    return { bucket, rank0, rank1, rankDigitsCount, subrankLength };
  }

  if (min.bucket !== max.bucket) {
    throw new NotEqualBucketsError(min, max);
  }

  if (min.rank.length !== max.rank.length) {
    throw new RankLengthsAreNotEqualError(min, max);
  }

  const bucket = min.bucket;
  const rankDigitsCount = min.rank.length;
  const subrankLength = BigInt(
    Math.max(min.subrank.length, max.subrank.length),
  );
  const rank0 =
    parseBase36String(min.rank + min.subrank) *
    radixBigInt ** (subrankLength - BigInt(min.subrank.length));
  const rank1 =
    parseBase36String(max.rank + max.subrank) *
    radixBigInt ** (subrankLength - BigInt(max.subrank.length));

  if (rank0 >= rank1) {
    throw new Rank0IsNotLessThanRank1Error(min, max);
  }

  return { bucket, rank0, rank1, rankDigitsCount, subrankLength };
}

function divAndRoundToNearest(x: bigint, y: bigint) {
  const result = x / y;
  return (x % y) * 2n >= y ? result + 1n : result;
}

function* generateWithoutSubrank(
  bucket: Bucket,
  r0: bigint,
  r1: bigint,
  rankDigitsCount: number,
  count: number,
  upwards: boolean,
): Generator<LexoRankData, { needRebalancing: false }> {
  if (upwards) {
    r1 = r0 + 1n + BigInt(count);
  } else {
    r0 = r1 - 1n - BigInt(count);
  }

  const result: LexoRankData = {
    bucket,
    rank: '',
    subrank: '',
  };

  for (let i = r0 + 1n; i < r1; i++) {
    result.rank = i.toString(radix).padStart(rankDigitsCount, '0');
    yield result;
  }

  return { needRebalancing: false };
}

const trimZerosRegex = /[0]*$/;

function* generateWithSubrank(
  bucket: Bucket,
  r0: bigint,
  r1: bigint,
  rankLength: number,
  subrankLength: bigint,
  exp: bigint,
  countPlus1: bigint,
): Generator<LexoRankData, RebalancingInfo> {
  const result: LexoRankData = {
    bucket,
    rank: '',
    subrank: '',
  };

  const subrankDivider = radixBigInt ** subrankLength;
  let divider = countPlus1;

  if (exp >= 0) {
    const mult = radixBigInt ** exp;
    r0 *= mult;
    r1 *= mult;
  } else {
    divider *= radixBigInt ** -exp;
  }

  const diff = r1 - r0;
  let needRebalancing = false;
  const subLen = Number(subrankLength);
  const countPlus1Num = Number(countPlus1);
  let v = r0 * countPlus1;

  for (let i = 1; i < countPlus1Num; i++) {
    v += diff;
    const r = divAndRoundToNearest(v, divider);

    result.rank = (r / subrankDivider)
      .toString(radix)
      .padStart(rankLength, '0');

    result.subrank = (r % subrankDivider)
      .toString(radix)
      .padStart(subLen, '0')
      .replace(trimZerosRegex, '');

    if (!needRebalancing && result.subrank.length > 8) {
      needRebalancing = true;
    }

    yield result;
  }

  return needRebalancing
    ? { needRebalancing: true, bucket }
    : { needRebalancing: false };
}

function checkSubrankLength(
  diff: bigint,
  subrankLength: bigint,
  minDiff: bigint,
  newLength: bigint,
) {
  const exp = newLength - subrankLength;

  if (exp >= 0) {
    return diff * radixBigInt ** exp >= minDiff;
  }

  return diff >= minDiff * radixBigInt ** -exp;
}

function calcSubrankLength(
  rank0: bigint,
  rank1: bigint,
  subrankLength: bigint,
  minDiff: bigint,
): bigint {
  const diff = rank1 - rank0;
  const subLen = BigInt(subrankLength);

  let l1 = 0n;

  if (checkSubrankLength(diff, subLen, minDiff, l1)) {
    return l1;
  }

  l1++;

  while (!checkSubrankLength(diff, subLen, minDiff, l1)) {
    l1 *= 2n;
  }

  let l0 = l1 / 2n;
  let mid = (l1 + l0) / 2n;

  while (mid > l0) {
    if (checkSubrankLength(diff, subLen, minDiff, mid)) {
      l1 = mid;
    } else {
      l0 = mid;
    }

    mid = (l1 + l0) / 2n;
  }

  return l1;
}

export default function midGenerator(
  min: 'min',
  max: LexoRank,
  count: number,
  upwards: boolean,
): Generator<LexoRankData, RebalancingInfo>;
export default function midGenerator(
  min: LexoRank,
  max: 'max',
  count: number,
  upwards: boolean,
): Generator<LexoRankData, RebalancingInfo>;
export default function midGenerator(
  min: LexoRank,
  max: LexoRank,
  count: number,
  upwards: boolean,
): Generator<LexoRankData, RebalancingInfo>;
export default function midGenerator(
  min: 'min' | LexoRank,
  max: 'max' | LexoRank,
  count: number,
  upwards: boolean,
): Generator<LexoRankData, RebalancingInfo> {
  const validationResult = validateArgs(min, max, count);
  const { bucket, rankDigitsCount, subrankLength } = validationResult;
  let { rank0, rank1 } = validationResult;
  const minDiff = BigInt(count + 1);
  const subLen = calcSubrankLength(rank0, rank1, subrankLength, minDiff);

  if (subLen === 0n) {
    const divider = radixBigInt ** subrankLength;
    rank0 = divAndRoundToNearest(rank0, divider);
    rank1 = divAndRoundToNearest(rank1, divider);

    return generateWithoutSubrank(
      bucket,
      rank0,
      rank1,
      rankDigitsCount,
      count,
      upwards,
    );
  }

  const exp = subLen - subrankLength;

  return generateWithSubrank(
    bucket,
    rank0,
    rank1,
    rankDigitsCount,
    subLen,
    exp,
    minDiff,
  );
}
