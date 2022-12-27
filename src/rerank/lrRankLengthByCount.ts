import { InvalidCountError } from '@/errors';

const radix = 36n;

export function lrRankLengthByCount(count = 1) {
  if (!Number.isInteger(count) || count <= 0) {
    throw new InvalidCountError(count);
  }

  count *= 512;

  let l1 = 1n;

  while (radix ** l1 < count) {
    l1 *= 2n;
  }

  let l0 = l1 / 2n;
  let mid = (l1 + l0) / 2n;

  while (mid > l0) {
    if (radix ** mid >= count) {
      l1 = mid;
    } else {
      l0 = mid;
    }

    mid = (l1 + l0) / 2n;
  }

  return Number(l1);
}
