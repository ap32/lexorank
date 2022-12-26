import { dataToLexoRank } from '@/internal/dataConvertors';
import prevGenerator from '@/internal/prevGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { LexoRank, RebalancingInfo } from '@/types';

export function lrPrevGen(
  rank: LexoRank,
  count = 1,
): Generator<LexoRank, RebalancingInfo> {
  return wrapGenerator(prevGenerator(rank, count), dataToLexoRank);
}
