import { InvalidLexoRankStringError, lrParse as p } from '@/parse';

describe('lrParse()', () => {
  test('bucket', () => {
    expect(() => p('foo:bar')).toThrow(InvalidLexoRankStringError);
    expect(() => p('|foo:bar')).toThrow(InvalidLexoRankStringError);
    expect(() => p('3|foo:bar')).toThrow(InvalidLexoRankStringError);
    expect(() => p('0|foo:bar')).not.toThrow();
    expect(() => p('1|foo:bar')).not.toThrow();
    expect(() => p('2|foo:bar')).not.toThrow();
  });

  test('rank', () => {
    expect(() => p('0|:bar')).toThrow(InvalidLexoRankStringError);
    expect(() => p('0|foo:bar')).not.toThrow();
  });

  test('subrank', () => {
    expect(() => p('0|foo')).toThrow(InvalidLexoRankStringError);
    expect(() => p('0|foo:')).not.toThrow();
    expect(() => p('0|foo:bar0')).toThrow(InvalidLexoRankStringError);
    expect(() => p('0|foo:bar')).not.toThrow();
  });
});
