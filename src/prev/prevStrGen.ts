import { dataToString } from '@/internal/dataConvertors';
import prevGenerator from '@/internal/prevGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { LexoRank, RebalancingInfo } from '@/types';

export function lrPrevStrGen(
  rank: LexoRank,
  count = 1,
): Generator<string, RebalancingInfo> {
  return wrapGenerator(prevGenerator(rank, count), dataToString);
}
