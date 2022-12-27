import type { LexoRankData } from '@/internal/midGenerator';

export default function* wrapGenerator<T, U>(
  g: Generator<LexoRankData, U>,
  cb: (v: LexoRankData) => T,
): Generator<T, U> {
  let curr;
  while (!(curr = g.next()).done) {
    yield cb(curr.value);
  }
  return curr.value;
}
