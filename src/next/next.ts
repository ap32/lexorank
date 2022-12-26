import getArrOrVal from '@/internal/getArrOrVal';
import { lrNextGen } from '@/next/nextGen';
import type { LexoRank } from '@/types';

export function lrNext(rank: LexoRank): LexoRank;
export function lrNext(rank: LexoRank, count: number): LexoRank[];
export function lrNext(
  rank: LexoRank,
  count?: number | undefined,
): LexoRank | LexoRank[] {
  return getArrOrVal(lrNextGen(rank, count), count);
}
