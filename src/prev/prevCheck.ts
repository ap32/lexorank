import getLexoRankResult from '@/internal/getLexoRankResult';
import { lrPrevGen } from '@/prev/prevGen';
import type {
  LexoRank,
  LexoRankArrayResult,
  LexoRankResult,
  LexoRankValueResult,
} from '@/types';

export function lrPrevCheck(rank: LexoRank): LexoRankValueResult<LexoRank>;
export function lrPrevCheck(
  rank: LexoRank,
  count: number,
): LexoRankArrayResult<LexoRank>;
export function lrPrevCheck(
  rank: LexoRank,
  count?: number | undefined,
): LexoRankResult<LexoRank> {
  return getLexoRankResult(lrPrevGen(rank, count), count);
}
