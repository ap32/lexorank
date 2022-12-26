import { GeneratorYieldsNotEnoughValues } from '@/errors';
import type { RebalancingInfo } from '@/types';

export default function getVal<T>(g: Generator<T, RebalancingInfo>): T {
  const v = g.next();
  if (v.done) {
    throw new GeneratorYieldsNotEnoughValues(1, 0);
  }

  return v.value;
}
