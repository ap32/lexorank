import { dataToLexoRank } from '@/internal/dataConvertors';
import nextGenerator from '@/internal/nextGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { LexoRank, RebalancingInfo } from '@/types';

export function lrNextGen(
  rank: LexoRank,
  count = 1,
): Generator<LexoRank, RebalancingInfo> {
  return wrapGenerator(nextGenerator(rank, count), dataToLexoRank);
}
