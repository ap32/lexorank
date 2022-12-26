import { getArr } from '@/internal/getArr';
import getRebalancingInfo from '@/internal/getRebalancingInfo';
import getVal from '@/internal/getVal';
import type { RebalancingInfo } from '@/types';

export default function getArrOrVal<T>(
  g: Generator<T, RebalancingInfo>,
  count: number | undefined,
): T[] | T {
  if (count !== undefined) {
    const result = getArr(g, count);
    getRebalancingInfo(g, count);
    return result;
  }

  const result = getVal(g);
  getRebalancingInfo(g, 1);
  return result;
}
