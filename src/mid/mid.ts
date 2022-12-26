import getArrOrVal from '@/internal/getArrOrVal';
import midOverloadedArgs from '@/internal/midCheckArgs';
import { lrMidGen } from '@/mid/midGen';
import type { LexoRank } from '@/types';

export function lrMid(
  rank0: LexoRank,
  rank1: LexoRank,
  upwards?: boolean,
): LexoRank;
export function lrMid(
  rank0: LexoRank,
  rank1: LexoRank,
  count: number,
  upwards?: boolean,
): LexoRank[];
export function lrMid(
  rank0: LexoRank,
  rank1: LexoRank,
  arg3?: number | boolean,
  arg4?: boolean,
): LexoRank | LexoRank[] {
  const { count, upwards } = midOverloadedArgs(arg3, arg4);
  return getArrOrVal(lrMidGen(rank0, rank1, count, upwards), count);
}
