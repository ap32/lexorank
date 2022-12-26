import getArrOrVal from '@/internal/getArrOrVal';
import { lrNextStrGen } from '@/next/nextStrGen';
import type { LexoRank } from '@/types';

export function lrNextStr(rank: LexoRank): string;
export function lrNextStr(rank: LexoRank, count: number): string[];
export function lrNextStr(
  rank: LexoRank,
  count?: number | undefined,
): string | string[] {
  return getArrOrVal(lrNextStrGen(rank, count), count);
}
