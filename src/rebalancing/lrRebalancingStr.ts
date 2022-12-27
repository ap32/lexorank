import { lrRebalancingStrGen } from './lrRebalancingStrGen';
import getArrOrVal from '@/internal/getArrOrVal';
import type { Bucket } from '@/types';

export function lrRebalancingStr(bucket: Bucket, rankLength: number): string;
export function lrRebalancingStr(
  bucket: Bucket,
  rankLength: number,
  count: number,
): string[];
export function lrRebalancingStr(
  bucket: Bucket,
  rankLength: number,
  count?: number,
) {
  return getArrOrVal(lrRebalancingStrGen(bucket, rankLength, count), count);
}
