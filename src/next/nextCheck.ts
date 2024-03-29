import getLexoRankResult from '@/internal/getLexoRankResult';
import { lrNextGen } from '@/next/nextGen';
import type {
  LexoRank,
  LexoRankArrayResult,
  LexoRankResult,
  LexoRankValueResult,
} from '@/types';

export function lrNextCheck(rank: LexoRank): LexoRankValueResult<LexoRank>;
export function lrNextCheck(
  rank: LexoRank,
  count: number,
): LexoRankArrayResult<LexoRank>;
export function lrNextCheck(
  rank: LexoRank,
  count?: number | undefined,
): LexoRankResult<LexoRank> {
  return getLexoRankResult(lrNextGen(rank, count), count);
}
