import getLexoRankResult from '@/internal/getLexoRankResult';
import { lrPrevStrGen } from '@/prev/prevStrGen';
import type {
  LexoRank,
  LexoRankArrayResult,
  LexoRankResult,
  LexoRankValueResult,
} from '@/types';

export function lrPrevStrCheck(rank: LexoRank): LexoRankValueResult<string>;
export function lrPrevStrCheck(
  rank: LexoRank,
  count: number,
): LexoRankArrayResult<string>;
export function lrPrevStrCheck(
  rank: LexoRank,
  count?: number | undefined,
): LexoRankResult<string> {
  return getLexoRankResult(lrPrevStrGen(rank, count), count);
}
