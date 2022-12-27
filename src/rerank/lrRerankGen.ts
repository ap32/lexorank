import { dataToLexoRank } from '@/internal/dataConvertors';
import { rerankGenerator } from '@/internal/rerankGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { Bucket } from '@/types';

export function lrRerankGen(
  bucket: Bucket,
  rankLength: number,
  count?: number,
) {
  return wrapGenerator(
    rerankGenerator(bucket, rankLength, count),
    dataToLexoRank,
  );
}
