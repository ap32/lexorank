import type { LexoRank } from '@/types';

export class LexoRankError extends Error {}

export class LexoRankArgumentTypeError extends LexoRankError {}

export class GeneratorYieldsNotEnoughValues extends LexoRankError {
  constructor(expected: number, recieved: number) {
    super(
      `The generator was expected to yield ${expected} ` +
        `value${expected === 1 ? '' : 's'}, ` +
        `but ${recieved} value${recieved === 1 ? ' was' : 's were'} received`,
    );
  }
}
export class GeneratorYieldsTooMuchValues extends LexoRankError {
  constructor(expected: number) {
    super(
      `The generator was expected to yield ${expected} values, but more values were received`,
    );
  }
}

export class InvalidCountError extends LexoRankError {
  constructor(count: number) {
    super(
      `LexoRank count is expected to be positive integer, ` +
        `but got ${JSON.stringify(count)}`,
    );
  }
}

export class RankLengthsAreNotEqualError extends LexoRankError {
  constructor(min: LexoRank, max: LexoRank) {
    super(
      `Rank lengths are expected to be equal, but got ` +
        `${JSON.stringify(min.rank)}.length === ${min.rank.length} and ` +
        `${JSON.stringify(max.rank)}.length === ${max.rank.length}`,
    );
  }
}

export class Rank0IsNotLessThanRank1Error extends LexoRankError {
  constructor(rank0: LexoRank, rank1: LexoRank) {
    super(
      `LexoRank \`rank0\` is expected to be less, than LexoRank \`rank1\`, but got ` +
        `${JSON.stringify(rank0.value)} is more or equal to ` +
        `${JSON.stringify(rank1.value)}`,
    );
  }
}

export class NotEqualBucketsError extends LexoRankError {
  constructor(min: LexoRank, max: LexoRank) {
    super(
      `LexoRank buckets are expected to be equal, but got ${min.bucket} and ${max.bucket}`,
    );
  }
}

export class InvalidRankLengthError extends LexoRankError {
  constructor(rankLength: number) {
    super(
      '`rankLength` is expected to be positive integer, ' +
        `but got ${JSON.stringify(rankLength)}`,
    );
  }
}

export class NotEnoughRankLengthError extends LexoRankError {
  constructor(rankLength: number, count: number) {
    super(
      `\`rankLength\` ${JSON.stringify(rankLength)} ` +
        `is not enough for \`count\` ${JSON.stringify(count)}. ` +
        `Calculate it using \`lrRankLengthByCount(count)\``,
    );
  }
}
