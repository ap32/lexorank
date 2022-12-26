import { dataToLexoRank } from '@/internal/dataConvertors';
import midGenerator from '@/internal/midGenerator';
import wrapGenerator from '@/internal/wrapGenerator';
import type { LexoRank, RebalancingInfo } from '@/types';

export function lrMidGen(
  rank0: LexoRank,
  rank1: LexoRank,
  count = 1,
  upwards = true,
): Generator<LexoRank, RebalancingInfo> {
  return wrapGenerator(
    midGenerator(rank0, rank1, count, upwards),
    dataToLexoRank,
  );
}
