import getArrOrVal from '@/internal/getArrOrVal';
import midOverloadedArgs from '@/internal/midCheckArgs';
import { lrMidStrGen } from '@/mid/midStrGen';
import type { LexoRank } from '@/types';

export function lrMidStr(
  rank0: LexoRank,
  rank1: LexoRank,
  upwards?: boolean,
): string;
export function lrMidStr(
  rank0: LexoRank,
  rank1: LexoRank,
  count: number,
  upwards?: boolean,
): string[];
export function lrMidStr(
  rank0: LexoRank,
  rank1: LexoRank,
  arg3?: number | boolean,
  arg4?: boolean,
): string | string[] {
  const { count, upwards } = midOverloadedArgs(arg3, arg4);
  return getArrOrVal(lrMidStrGen(rank0, rank1, count, upwards), count);
}
