export type Bucket = 0 | 1 | 2;

export type LexoRank = {
  readonly bucket: Bucket;
  readonly rank: string;

  readonly subrank: string;
  readonly value: string;
};

export type RebalancingInfo =
  | { needRebalancing: true; bucket: Bucket }
  | { needRebalancing: false; bucket?: undefined };

export type LexoRankValueResult<T> = {
  rank: T;
  rebalancing: RebalancingInfo;
};
export type LexoRankArrayResult<T> = {
  ranks: T[];
  rebalancing: RebalancingInfo;
};
export type LexoRankResult<T> = LexoRankValueResult<T> | LexoRankArrayResult<T>;
