import { GeneratorYieldsTooMuchValues } from '@/errors';
import type { RebalancingInfo } from '@/types';

export default function getRebalancingInfo<T>(
  g: Generator<T, RebalancingInfo>,
  expected: number,
): RebalancingInfo {
  const v = g.next();
  if (!v.done) {
    throw new GeneratorYieldsTooMuchValues(expected);
  }

  return v.value;
}
