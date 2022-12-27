import { dataToString } from '@/internal/dataConvertors';
import { rebalancingGenerator } from '@/internal/rebalancingGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { Bucket } from '@/types';

export function lrRebalancingStrGen(
  bucket: Bucket,
  rankLength: number,
  count?: number,
) {
  return wrapGenerator(
    rebalancingGenerator(bucket, rankLength, count),
    dataToString,
  );
}
