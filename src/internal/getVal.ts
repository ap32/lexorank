import { GeneratorYieldsNotEnoughValues } from '@/errors';

export default function getVal<T, U>(g: Generator<T, U>): T {
  const v = g.next();
  if (v.done) {
    throw new GeneratorYieldsNotEnoughValues(1, 0);
  }

  return v.value;
}
