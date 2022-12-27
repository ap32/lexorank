import { dataToLexoRank } from '@/internal/dataConvertors';
import { rebalancingGenerator } from '@/internal/rebalancingGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { Bucket } from '@/types';

export function lrRebalancingGen(
  bucket: Bucket,
  rankLength: number,
  count?: number,
) {
  return wrapGenerator(
    rebalancingGenerator(bucket, rankLength, count),
    dataToLexoRank,
  );
}
