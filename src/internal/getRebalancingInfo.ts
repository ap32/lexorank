import { GeneratorYieldsTooMuchValues } from '@/errors';

export default function getGeneratorReturn<T, U>(
  g: Generator<T, U>,
  expected: number,
): U {
  const v = g.next();
  if (!v.done) {
    throw new GeneratorYieldsTooMuchValues(expected);
  }

  return v.value;
}
