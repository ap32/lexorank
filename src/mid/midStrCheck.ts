import type {
  LexoRankArrayResult,
  LexoRankResult,
  LexoRankValueResult,
} from '@/internal/getLexoRankResult';
import getLexoRankResult from '@/internal/getLexoRankResult';
import midOverloadedArgs from '@/internal/midCheckArgs';
import { lrMidStrGen } from '@/mid/midStrGen';
import type { LexoRank } from '@/types';

export function lrMidStrCheck(
  rank0: LexoRank,
  rank1: LexoRank,
  upwards?: boolean,
): LexoRankValueResult<string>;
export function lrMidStrCheck(
  rank0: LexoRank,
  rank1: LexoRank,
  count: number,
  upwards?: boolean,
): LexoRankArrayResult<string>;
export function lrMidStrCheck(
  rank0: LexoRank,
  rank1: LexoRank,
  arg3?: number | boolean,
  arg4?: boolean,
): LexoRankResult<string> {
  const { count, upwards } = midOverloadedArgs(arg3, arg4);
  return getLexoRankResult(lrMidStrGen(rank0, rank1, count, upwards), count);
}
