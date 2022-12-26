import getArrOrVal from '@/internal/getArrOrVal';
import { lrPrevStrGen } from '@/prev/prevStrGen';
import type { LexoRank } from '@/types';

export function lrPrevStr(rank: LexoRank): string;
export function lrPrevStr(rank: LexoRank, count: number): string[];
export function lrPrevStr(
  rank: LexoRank,
  count?: number | undefined,
): string | string[] {
  return getArrOrVal(lrPrevStrGen(rank, count), count);
}
