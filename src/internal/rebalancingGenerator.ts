import type { LexoRankData } from './midGenerator';
import {
  InvalidCountError,
  InvalidRankLengthError,
  NotEnoughRankLengthError,
} from '@/errors';
import type { Bucket } from '@/types';

const radix = 36;
const radixBigInt = 36n;

export function rebalancingGenerator(
  bucket: Bucket,
  rankLength: number,
  count = 1,
): Generator<LexoRankData, void> {
  if (!Number.isInteger(rankLength) || rankLength <= 0) {
    throw new InvalidRankLengthError(rankLength);
  }

  if (!Number.isInteger(count) || count <= 0) {
    throw new InvalidCountError(count);
  }

  let to = radixBigInt ** BigInt(rankLength);
  const mid = to / 2n;

  if (to - mid < count) {
    throw new NotEnoughRankLengthError(rankLength, count);
  }

  to = mid + BigInt(count);

  return generate(bucket, mid, to, rankLength);
}

function* generate(
  bucket: Bucket,
  from: bigint,
  to: bigint,
  rankLength: number,
) {
  const data: LexoRankData = {
    bucket,
    rank: '',
    subrank: '',
  };

  for (let r = from; r < to; r++) {
    data.rank = r.toString(radix).padStart(rankLength, '0');
    yield data;
  }
}
