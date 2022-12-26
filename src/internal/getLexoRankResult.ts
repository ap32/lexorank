import { getArr } from '@/internal/getArr';
import getRebalancingInfo from '@/internal/getRebalancingInfo';
import getVal from '@/internal/getVal';
import type { RebalancingInfo } from '@/types';

export type LexoRankValueResult<T> = {
  rank: T;
  rebalancing: RebalancingInfo;
};
export type LexoRankArrayResult<T> = {
  ranks: T[];
  rebalancing: RebalancingInfo;
};
export type LexoRankResult<T> = LexoRankValueResult<T> | LexoRankArrayResult<T>;

export default function getLexoRankResult<T>(
  g: Generator<T, RebalancingInfo>,
  count: number | undefined,
): LexoRankResult<T> {
  if (count !== undefined) {
    return {
      ranks: getArr(g, count),
      rebalancing: getRebalancingInfo(g, count),
    };
  }

  return {
    rank: getVal(g),
    rebalancing: getRebalancingInfo(g, 1),
  };
}
