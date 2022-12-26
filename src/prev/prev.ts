import getArrOrVal from '@/internal/getArrOrVal';
import { lrPrevGen } from '@/prev/prevGen';
import type { LexoRank } from '@/types';

export function lrPrev(rank: LexoRank): LexoRank;
export function lrPrev(rank: LexoRank, count: number): LexoRank[];
export function lrPrev(
  rank: LexoRank,
  count?: number | undefined,
): LexoRank | LexoRank[] {
  return getArrOrVal(lrPrevGen(rank, count), count);
}
