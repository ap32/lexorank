import getLexoRankResult from '@/internal/getLexoRankResult';
import midOverloadedArgs from '@/internal/midCheckArgs';
import { lrMidGen } from '@/mid/midGen';
import type {
  LexoRank,
  LexoRankArrayResult,
  LexoRankResult,
  LexoRankValueResult,
} from '@/types';

export function lrMidCheck(
  rank0: LexoRank,
  rank1: LexoRank,
  upwards?: boolean,
): LexoRankValueResult<LexoRank>;
export function lrMidCheck(
  rank0: LexoRank,
  rank1: LexoRank,
  count: number,
  upwards?: boolean,
): LexoRankArrayResult<LexoRank>;
export function lrMidCheck(
  rank0: LexoRank,
  rank1: LexoRank,
  arg3?: number | boolean,
  arg4?: boolean,
): LexoRankResult<LexoRank> {
  const { count, upwards } = midOverloadedArgs(arg3, arg4);
  return getLexoRankResult(lrMidGen(rank0, rank1, count, upwards), count);
}
