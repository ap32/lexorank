import { getArr } from '@/internal/getArr';
import getGeneratorReturn from '@/internal/getRebalancingInfo';
import getVal from '@/internal/getVal';
import type { LexoRankResult, RebalancingInfo } from '@/types';

export default function getLexoRankResult<T>(
  g: Generator<T, RebalancingInfo>,
  count: number | undefined,
): LexoRankResult<T> {
  if (count !== undefined) {
    return {
      ranks: getArr(g, count),
      rebalancing: getGeneratorReturn(g, count),
    };
  }

  return {
    rank: getVal(g),
    rebalancing: getGeneratorReturn(g, 1),
  };
}
