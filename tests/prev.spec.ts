import getAll from './utils/getAllFromGenerator';
import { lrParse as p } from '@/parse';
import {
  lrPrev as prev,
  lrPrevCheck as prevCheck,
  lrPrevGen as prevGen,
  lrPrevStr as prevStr,
  lrPrevStrCheck as prevStrCheck,
  lrPrevStrGen as prevStrGen,
} from '@/prev';

describe('lrPrev()', () => {
  test('bucket', () => {
    expect(prev(p('0|2:')).bucket).toEqual(0);
    expect(prev(p('1|2:')).bucket).toEqual(1);
    expect(prev(p('2|2:')).bucket).toEqual(2);
  });

  test('rank length', () => {
    expect(prev(p('0|2:')).rank.length).toEqual(1);
    expect(prev(p('0|02:')).rank.length).toEqual(2);
    expect(prev(p('0|002:')).rank.length).toEqual(3);
  });

  test('without subrank', () => {
    expect(prevStr(p('0|2:'))).toEqual('0|1:');
    expect(prevStr(p('0|03:'))).toEqual('0|02:');
    expect(prevStr(p('0|03:'), 2)).toStrictEqual(['0|01:', '0|02:']);
    expect(prevStr(p('0|010:'), 2)).toStrictEqual(['0|00y:', '0|00z:']);
  });

  test('with subrank', () => {
    expect(prevStr(p('0|1:'))).toEqual('0|0:i');
    expect(prevStr(p('0|01:'), 2)).toStrictEqual(['0|00:c', '0|00:o']);
    expect(prevStr(p('0|0:02'), 2)).toStrictEqual(['0|0:00o', '0|0:01c']);
  });

  test('rounding', () => {
    expect(prevStr(p('0|1:z'))).toEqual('0|1:');
    expect(prevStr(p('0|0:3'))).toEqual('0|0:2');
    expect(prevStr(p('0|0:2z'))).toEqual('0|0:1');
    expect(prevStr(p('0|0:6'), 3)).toEqual(['0|0:2', '0|0:3', '0|0:5']);
    expect(prevStr(p('0|0:5z'), 3)).toEqual(['0|0:1', '0|0:3', '0|0:4']);
    expect(prevStr(p('0|0:4'), 2)).toStrictEqual(['0|0:1', '0|0:3']);
  });

  test('variants', () => {
    {
      const r = p('0|0:123');
      const { rank, rebalancing } = prevCheck(r);
      const rankStr = rank.value;
      expect(prevStrCheck(r)).toEqual({ rank: rankStr, rebalancing });
      expect(prev(r)).toEqual(rank);
      expect(prevStr(r)).toEqual(rankStr);
      expect(getAll(prevGen(r))).toEqual({
        values: [rank],
        return: rebalancing,
      });
      expect(getAll(prevStrGen(r))).toEqual({
        values: [rankStr],
        return: rebalancing,
      });
    }
    {
      const r = p('1|0:456');
      const { ranks, rebalancing } = prevCheck(r, 5);
      const ranksStr = ranks.map((r) => r.value);
      expect(prevStrCheck(r, 5)).toEqual({ ranks: ranksStr, rebalancing });
      expect(prev(r, 5)).toEqual(ranks);
      expect(prevStr(r, 5)).toEqual(ranksStr);
      expect(getAll(prevGen(r, 5))).toEqual({
        values: ranks,
        return: rebalancing,
      });
      expect(getAll(prevStrGen(r, 5))).toEqual({
        values: ranksStr,
        return: rebalancing,
      });
    }
  });
});
