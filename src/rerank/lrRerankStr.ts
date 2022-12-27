import { lrRerankStrGen } from './lrRerankStrGen';
import getArrOrVal from '@/internal/getArrOrVal';
import type { Bucket } from '@/types';

export function lrRerankStr(bucket: Bucket, rankLength: number): string;
export function lrRerankStr(
  bucket: Bucket,
  rankLength: number,
  count: number,
): string[];
export function lrRerankStr(
  bucket: Bucket,
  rankLength: number,
  count?: number,
) {
  return getArrOrVal(lrRerankStrGen(bucket, rankLength, count), count);
}
