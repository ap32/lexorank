import { dataToString } from '@/internal/dataConvertors';
import nextGenerator from '@/internal/nextGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { LexoRank, RebalancingInfo } from '@/types';

export function lrNextStrGen(
  rank: LexoRank,
  count = 1,
): Generator<string, RebalancingInfo> {
  return wrapGenerator(nextGenerator(rank, count), dataToString);
}
