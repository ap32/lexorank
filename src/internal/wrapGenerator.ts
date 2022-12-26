import type { LexoRankData } from '@/internal/midGenerator';
import type { RebalancingInfo } from '@/types';

export default function* wrapGenerator<T>(
  g: Generator<LexoRankData, RebalancingInfo>,
  cb: (v: LexoRankData) => T,
): Generator<T, RebalancingInfo> {
  let curr;
  while (!(curr = g.next()).done) {
    yield cb(curr.value);
  }
  return curr.value;
}
