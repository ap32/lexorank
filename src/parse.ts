import { LexoRankError } from '@/errors';
import type { Bucket, LexoRank } from '@/types';

const lexoRankRegex = /^([0-2])\|([\da-z]+):([0-9a-z]*[1-9a-z]$|$)/;
const zeroRankRegex = /^[0]+$/;

export class InvalidLexoRankStringError extends LexoRankError {
  constructor(lexoRank: string) {
    super(`lexoRank string ${JSON.stringify(lexoRank)} is invalid`);
  }
}

export function lrParse(lexoRank: string): LexoRank {
  const match = lexoRank.match(lexoRankRegex);
  if (match === null) {
    throw new InvalidLexoRankStringError(lexoRank);
  }

  const [value, bucketStr, rank, subrank] = match;

  if (subrank.length === 0 && zeroRankRegex.test(rank)) {
    throw new InvalidLexoRankStringError(lexoRank);
  }

  return {
    bucket: parseInt(bucketStr) as Bucket,
    rank,
    subrank,
    value,
  };
}
