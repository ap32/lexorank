import { lrRerankGen } from './lrRerankGen';
import getArrOrVal from '@/internal/getArrOrVal';
import type { Bucket, LexoRank } from '@/types';

export function lrRerank(bucket: Bucket, rankLength: number): LexoRank;
export function lrRerank(
  bucket: Bucket,
  rankLength: number,
  count: number,
): LexoRank[];
export function lrRerank(bucket: Bucket, rankLength: number, count?: number) {
  return getArrOrVal(lrRerankGen(bucket, rankLength, count), count);
}
