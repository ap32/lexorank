export default function getAllFromGenerator<T, U>(
  gen: Generator<T, U>,
): { values: T[]; return: U } {
  const values = [];

  let v = gen.next();

  while (!v.done) {
    values.push(v.value);
    v = gen.next();
  }

  return { values, return: v.value };
}
