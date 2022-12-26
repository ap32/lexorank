import { GeneratorYieldsNotEnoughValues } from '@/errors';
import type { RebalancingInfo } from '@/types';

export function getArr<T>(
  g: Generator<T, RebalancingInfo>,
  count: number,
): T[] {
  const ranks = Array(count);

  for (let i = 0; i < count; i++) {
    const result = g.next();
    if (result.done) {
      throw new GeneratorYieldsNotEnoughValues(count, i);
    }
    ranks[i] = result.value;
  }
  return ranks;
}
