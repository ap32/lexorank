import getAll from './utils/getAllFromGenerator';
import {
  InvalidCountError,
  InvalidRankLengthError,
  NotEnoughRankLengthError,
} from '@/errors';
import { lrRebalancing as rebalancing } from '@/rebalancing';
import { lrRankLengthByCount as lengthByCount } from '@/rebalancing/lrRankLengthByCount';
import { lrRebalancingGen as rebalancingGen } from '@/rebalancing/lrRebalancingGen';
import { lrRebalancingStr as rebalancingStr } from '@/rebalancing/lrRebalancingStr';
import { lrRebalancingStrGen as rebalancingStrGen } from '@/rebalancing/lrRebalancingStrGen';

describe('lrRankLengthByCount()', () => {
  test('validation', () => {
    expect(() => lengthByCount(0)).toThrow(InvalidCountError);
    expect(() => lengthByCount(NaN)).toThrow(InvalidCountError);
    expect(() => lengthByCount()).not.toThrow(InvalidCountError);
    expect(() => lengthByCount(5)).not.toThrow(InvalidCountError);
  });

  test('result', () => {
    expect(lengthByCount()).toEqual(2);
    expect(lengthByCount(2)).toEqual(2);
    expect(lengthByCount(3)).toEqual(3);
    expect(lengthByCount(91)).toEqual(3);
    expect(lengthByCount(92)).toEqual(4);
    expect(lengthByCount(3280)).toEqual(4);
    expect(lengthByCount(3281)).toEqual(5);
  });
});

describe('lrRebalancing()', () => {
  test('validation', () => {
    expect(() => rebalancing(0, 0)).toThrow(InvalidRankLengthError);
    expect(() => rebalancing(0, Infinity)).toThrow(InvalidRankLengthError);
    expect(() => rebalancing(0, 1)).not.toThrow();

    expect(() => rebalancing(0, 1, 0)).toThrow(InvalidCountError);
    expect(() => rebalancing(0, 1, Infinity)).toThrow(InvalidCountError);

    expect(() => rebalancing(0, 1, 19)).toThrow(NotEnoughRankLengthError);
    expect(() => rebalancing(0, 1, 18)).not.toThrow();
    expect(() => rebalancing(0, 2, 649)).toThrow(NotEnoughRankLengthError);
    expect(() => rebalancing(0, 2, 648)).not.toThrow();
  });

  test('bucket', () => {
    expect(rebalancing(0, 1).bucket).toEqual(0);
    expect(rebalancing(1, 1).bucket).toEqual(1);
    expect(rebalancing(2, 1).bucket).toEqual(2);
  });

  test('result', () => {
    expect(rebalancingStr(0, 1)).toEqual('0|i:');
    expect(rebalancingStr(0, 1, 3)).toEqual(['0|i:', '0|j:', '0|k:']);
    expect(rebalancingStr(0, 2)).toEqual('0|i0:');
    expect(rebalancingStr(0, 2, 3)).toEqual(['0|i0:', '0|i1:', '0|i2:']);
  });

  test('variants', () => {
    {
      const rank = rebalancing(0, 2);
      const rankStr = rank.value;
      expect(rebalancingStr(0, 2)).toEqual(rankStr);
      expect(getAll(rebalancingGen(0, 2))).toEqual({ values: [rank] });
      expect(getAll(rebalancingStrGen(0, 2))).toEqual({ values: [rankStr] });
    }
    {
      const ranks = rebalancing(0, 2, 5);
      const ranksStr = ranks.map((r) => r.value);
      expect(rebalancingStr(0, 2, 5)).toEqual(ranksStr);
      expect(getAll(rebalancingGen(0, 2, 5))).toEqual({ values: ranks });
      expect(getAll(rebalancingStrGen(0, 2, 5))).toEqual({ values: ranksStr });
    }
  });
});
