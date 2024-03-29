import getLexoRankResult from '@/internal/getLexoRankResult';
import { lrNextStrGen } from '@/next/nextStrGen';
import type {
  LexoRank,
  LexoRankArrayResult,
  LexoRankResult,
  LexoRankValueResult,
} from '@/types';

export function lrNextStrCheck(rank: LexoRank): LexoRankValueResult<string>;
export function lrNextStrCheck(
  rank: LexoRank,
  count: number,
): LexoRankArrayResult<string>;
export function lrNextStrCheck(
  rank: LexoRank,
  count?: number | undefined,
): LexoRankResult<string> {
  return getLexoRankResult(lrNextStrGen(rank, count), count);
}
