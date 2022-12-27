import { lrRebalancingGen } from './lrRebalancingGen';
import getArrOrVal from '@/internal/getArrOrVal';
import type { Bucket, LexoRank } from '@/types';

export function lrRebalancing(bucket: Bucket, rankLength: number): LexoRank;
export function lrRebalancing(
  bucket: Bucket,
  rankLength: number,
  count: number,
): LexoRank[];
export function lrRebalancing(
  bucket: Bucket,
  rankLength: number,
  count?: number,
) {
  return getArrOrVal(lrRebalancingGen(bucket, rankLength, count), count);
}
