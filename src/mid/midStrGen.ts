import { dataToString } from '@/internal/dataConvertors';
import midGenerator from '@/internal/midGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { LexoRank, RebalancingInfo } from '@/types';

export function lrMidStrGen(
  rank0: LexoRank,
  rank1: LexoRank,
  count = 1,
  upwards = true,
): Generator<string, RebalancingInfo> {
  return wrapGenerator(
    midGenerator(rank0, rank1, count, upwards),
    dataToString,
  );
}
