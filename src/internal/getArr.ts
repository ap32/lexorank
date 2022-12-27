import { GeneratorYieldsNotEnoughValues } from '@/errors';

export function getArr<T, U>(g: Generator<T, U>, count: number): T[] {
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
