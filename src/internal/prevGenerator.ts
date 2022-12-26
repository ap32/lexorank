import midGenerator from '@/internal/midGenerator';
import type { LexoRank } from '@/types';

export default function prevGenerator(rank: LexoRank, count: number) {
  return midGenerator('min', rank, count, false);
}
