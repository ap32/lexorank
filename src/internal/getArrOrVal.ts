import { getArr } from '@/internal/getArr';
import getGeneratorReturn from '@/internal/getRebalancingInfo';
import getVal from '@/internal/getVal';

export default function getArrOrVal<T, U>(
  g: Generator<T, U>,
  count: number | undefined,
): T[] | T {
  if (count !== undefined) {
    const result = getArr(g, count);
    getGeneratorReturn(g, count);
    return result;
  }

  const result = getVal(g);
  getGeneratorReturn(g, 1);
  return result;
}
