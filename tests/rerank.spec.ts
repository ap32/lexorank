import getAll from './utils/getAllFromGenerator';
import {
  InvalidCountError,
  InvalidRankLengthError,
  NotEnoughRankLengthError,
} from '@/errors';
import { lrRerank as rerank } from '@/rerank';
import { lrRankLengthByCount as lengthByCount } from '@/rerank/lrRankLengthByCount';
import { lrRerankGen as rerankGen } from '@/rerank/lrRerankGen';
import { lrRerankStr as rerankStr } from '@/rerank/lrRerankStr';
import { lrRerankStrGen as rerankStrGen } from '@/rerank/lrRerankStrGen';

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

describe('lrRerank()', () => {
  test('validation', () => {
    expect(() => rerank(0, 0)).toThrow(InvalidRankLengthError);
    expect(() => rerank(0, Infinity)).toThrow(InvalidRankLengthError);
    expect(() => rerank(0, 1)).not.toThrow();

    expect(() => rerank(0, 1, 0)).toThrow(InvalidCountError);
    expect(() => rerank(0, 1, Infinity)).toThrow(InvalidCountError);

    expect(() => rerank(0, 1, 19)).toThrow(NotEnoughRankLengthError);
    expect(() => rerank(0, 1, 18)).not.toThrow();
    expect(() => rerank(0, 2, 649)).toThrow(NotEnoughRankLengthError);
    expect(() => rerank(0, 2, 648)).not.toThrow();
  });

  test('bucket', () => {
    expect(rerank(0, 1).bucket).toEqual(0);
    expect(rerank(1, 1).bucket).toEqual(1);
    expect(rerank(2, 1).bucket).toEqual(2);
  });

  test('result', () => {
    expect(rerankStr(0, 1)).toEqual('0|i:');
    expect(rerankStr(0, 1, 3)).toEqual(['0|i:', '0|j:', '0|k:']);
    expect(rerankStr(0, 2)).toEqual('0|i0:');
    expect(rerankStr(0, 2, 3)).toEqual(['0|i0:', '0|i1:', '0|i2:']);
  });

  test('variants', () => {
    {
      const rank = rerank(0, 2);
      const rankStr = rank.value;
      expect(rerankStr(0, 2)).toEqual(rankStr);
      expect(getAll(rerankGen(0, 2))).toEqual({ values: [rank] });
      expect(getAll(rerankStrGen(0, 2))).toEqual({ values: [rankStr] });
    }
    {
      const ranks = rerank(0, 2, 5);
      const ranksStr = ranks.map((r) => r.value);
      expect(rerankStr(0, 2, 5)).toEqual(ranksStr);
      expect(getAll(rerankGen(0, 2, 5))).toEqual({ values: ranks });
      expect(getAll(rerankStrGen(0, 2, 5))).toEqual({ values: ranksStr });
    }
  });
});
