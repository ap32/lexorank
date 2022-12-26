import midGenerator from '@/internal/midGenerator';
import type { LexoRank } from '@/types';

export default function nextGenerator(rank: LexoRank, count = 1) {
  return midGenerator(rank, 'max', count, true);
}
