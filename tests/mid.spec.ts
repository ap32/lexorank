import getAll from './utils/getAllFromGenerator';
import {
  Rank0IsNotLessThanRank1Error,
  RankLengthsAreNotEqualError,
} from '@/errors';
import {
  lrMid as mid,
  lrMidCheck as midCheck,
  lrMidGen as midGen,
  lrMidStr as midStr,
  lrMidStrCheck as midStrCheck,
  lrMidStrGen as midStrGen,
} from '@/mid';
import { lrParse as p } from '@/parse';

describe('lrMid()', () => {
  test('ranks input order', () => {
    expect(() => mid(p('0|2:'), p('0|1:'))).toThrow(
      Rank0IsNotLessThanRank1Error,
    );
    expect(() => mid(p('0|2:'), p('0|2:'))).toThrow(
      Rank0IsNotLessThanRank1Error,
    );
    expect(() => mid(p('0|2:'), p('0|3:'))).not.toThrow();
  });

  test('same rank lengths', () => {
    expect(() => mid(p('0|1:'), p('0|02:'))).toThrow(
      RankLengthsAreNotEqualError,
    );
    expect(() => mid(p('0|001:'), p('0|02:'))).toThrow(
      RankLengthsAreNotEqualError,
    );
    expect(() => mid(p('0|1:'), p('0|2:'))).not.toThrow();
  });

  test('same bucket', () => {
    expect(mid(p('0|1:'), p('0|2:')).bucket).toEqual(0);
    expect(mid(p('1|1:'), p('1|2:')).bucket).toEqual(1);
    expect(mid(p('2|1:'), p('2|2:')).bucket).toEqual(2);
  });

  test('rank length', () => {
    expect(mid(p('0|1:'), p('0|3:')).rank.length).toEqual(1);
    expect(mid(p('0|01:'), p('0|03:')).rank.length).toEqual(2);
    expect(mid(p('0|001:'), p('0|003:')).rank.length).toEqual(3);
  });

  test('without subrank', () => {
    expect(midStr(p('0|1:'), p('0|4:'))).toEqual('0|2:');
    expect(midStr(p('0|1:'), p('0|4:'), false)).toEqual('0|3:');
    expect(midStr(p('0|03:'), p('0|08:'), 2)).toStrictEqual(['0|04:', '0|05:']);
    expect(midStr(p('0|03:'), p('0|08:'), 2, false)).toStrictEqual([
      '0|06:',
      '0|07:',
    ]);
    expect(midStr(p('0|08z:'), p('0|111:'), 2)).toStrictEqual([
      '0|090:',
      '0|091:',
    ]);
    expect(midStr(p('0|08z:'), p('0|111:'), 2, false)).toStrictEqual([
      '0|10z:',
      '0|110:',
    ]);
  });

  test('with subrank', () => {
    expect(midStr(p('0|1:'), p('0|2:'))).toEqual('0|1:i');
    expect(midStr(p('0|03:'), p('0|04:'), 2)).toStrictEqual([
      '0|03:c',
      '0|03:o',
    ]);
    expect(midStr(p('0|r:5'), p('0|r:7'), 2)).toStrictEqual([
      '0|r:5o',
      '0|r:6c',
    ]);
  });

  test('rounding', () => {
    expect(midStr(p('0|1:'), p('0|2:z'))).toEqual('0|2:');
    expect(midStr(p('0|0:a'), p('0|0:d'))).toEqual('0|0:c');
    expect(midStr(p('0|0:a'), p('0|0:cz'))).toEqual('0|0:b');
    expect(midStr(p('0|0:9z'), p('0|0:d'))).toEqual('0|0:b');
    expect(midStr(p('0|0:3'), p('0|0:9'), 3)).toEqual([
      '0|0:5',
      '0|0:6',
      '0|0:8',
    ]);
    expect(midStr(p('0|0:2z'), p('0|0:9'), 3)).toEqual([
      '0|0:4',
      '0|0:6',
      '0|0:7',
    ]);
    expect(midStr(p('0|0:3'), p('0|0:8z'), 3)).toEqual([
      '0|0:4',
      '0|0:6',
      '0|0:7',
    ]);
    expect(midStr(p('0|0:25'), p('0|0:65'), 2)).toEqual(['0|0:3', '0|0:5']);
    expect(midStr(p('0|0:26'), p('0|0:66'), 2)).toEqual(['0|0:4', '0|0:5']);
  });

  test('variants', () => {
    {
      const r0 = p('0|0:123');
      const r1 = p('0|0:456');
      const { rank, rebalancing } = midCheck(r0, r1);
      const rankStr = rank.value;
      expect(midStrCheck(r0, r1)).toEqual({ rank: rankStr, rebalancing });
      expect(mid(r0, r1)).toEqual(rank);
      expect(midStr(r0, r1)).toEqual(rankStr);
      expect(getAll(midGen(r0, r1))).toEqual({
        values: [rank],
        return: rebalancing,
      });
      expect(getAll(midStrGen(r0, r1))).toEqual({
        values: [rankStr],
        return: rebalancing,
      });
    }
    {
      const r0 = p('1|0:789');
      const r1 = p('1|0:abc');
      const { ranks, rebalancing } = midCheck(r0, r1, 5);
      const ranksStr = ranks.map((r) => r.value);
      expect(midStrCheck(r0, r1, 5)).toEqual({ ranks: ranksStr, rebalancing });
      expect(mid(r0, r1, 5)).toEqual(ranks);
      expect(midStr(r0, r1, 5)).toEqual(ranksStr);
      expect(getAll(midGen(r0, r1, 5))).toEqual({
        values: ranks,
        return: rebalancing,
      });
      expect(getAll(midStrGen(r0, r1, 5))).toEqual({
        values: ranksStr,
        return: rebalancing,
      });
    }
  });
});
