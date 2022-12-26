import getAll from './utils/getAllFromGenerator';
import {
  lrNext as next,
  lrNextCheck as nextCheck,
  lrNextGen as nextGen,
  lrNextStr as nextStr,
  lrNextStrCheck as nextStrCheck,
  lrNextStrGen as nextStrGen,
} from '@/next';
import { lrParse as p } from '@/parse';

describe('lrNext()', () => {
  test('bucket', () => {
    expect(next(p('0|1:')).bucket).toEqual(0);
    expect(next(p('1|1:')).bucket).toEqual(1);
    expect(next(p('2|1:')).bucket).toEqual(2);
  });

  test('rank length', () => {
    expect(next(p('0|1:')).rank.length).toEqual(1);
    expect(next(p('0|01:')).rank.length).toEqual(2);
    expect(next(p('0|001:')).rank.length).toEqual(3);
  });

  test('without subrank', () => {
    expect(nextStr(p('0|1:'))).toEqual('0|2:');
    expect(nextStr(p('0|02:'), 2)).toStrictEqual(['0|03:', '0|04:']);
    expect(nextStr(p('0|0y:'), 3)).toStrictEqual(['0|0z:', '0|10:', '0|11:']);
    expect(nextStr(p('0|0y:'), 3)).toStrictEqual(['0|0z:', '0|10:', '0|11:']);
    expect(nextStr(p('0|y:'))).toEqual('0|z:');
  });

  test('with subrank', () => {
    expect(nextStr(p('0|z:'))).toEqual('0|z:i');
    expect(nextStr(p('0|z:'), 2)).toEqual(['0|z:c', '0|z:o']);
    expect(nextStr(p('0|z:y'), 2)).toStrictEqual(['0|z:yo', '0|z:zc']);
  });

  test('rounding', () => {
    expect(nextStr(p('0|y:0z'))).toEqual('0|z:');
    expect(nextStr(p('0|z:x'))).toEqual('0|z:z');
    expect(nextStr(p('0|z:wz'))).toEqual('0|z:y');
    expect(nextStr(p('0|z:u'), 3)).toStrictEqual(['0|z:w', '0|z:x', '0|z:z']);
    expect(nextStr(p('0|z:tz'), 3)).toStrictEqual(['0|z:v', '0|z:x', '0|z:y']);
    expect(nextStr(p('0|z:w'), 2)).toStrictEqual(['0|z:x', '0|z:z']);
  });

  test('variants', () => {
    {
      const r = p('0|z:opq');
      const { rank, rebalancing } = nextCheck(r);
      const rankStr = rank.value;
      expect(nextStrCheck(r)).toEqual({ rank: rankStr, rebalancing });
      expect(next(r)).toEqual(rank);
      expect(nextStr(r)).toEqual(rankStr);
      expect(getAll(nextGen(r))).toEqual({
        values: [rank],
        return: rebalancing,
      });
      expect(getAll(nextStrGen(r))).toEqual({
        values: [rankStr],
        return: rebalancing,
      });
    }
    {
      const r = p('0|z:rst');
      const { ranks, rebalancing } = nextCheck(r, 5);
      const ranksStr = ranks.map((r) => r.value);
      expect(nextStrCheck(r, 5)).toEqual({ ranks: ranksStr, rebalancing });
      expect(next(r, 5)).toEqual(ranks);
      expect(nextStr(r, 5)).toEqual(ranksStr);
      expect(getAll(nextGen(r, 5))).toEqual({
        values: ranks,
        return: rebalancing,
      });
      expect(getAll(nextStrGen(r, 5))).toEqual({
        values: ranksStr,
        return: rebalancing,
      });
    }
  });
});
