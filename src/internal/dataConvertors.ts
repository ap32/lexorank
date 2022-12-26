import type { LexoRankData } from '@/internal/midGenerator';
import type { LexoRank } from '@/types';

export function dataToLexoRank(data: LexoRankData): LexoRank {
  return { value: dataToString(data), ...data };
}

export function dataToString(data: LexoRankData): string {
  return `${data.bucket}|${data.rank}:${data.subrank}`;
}
