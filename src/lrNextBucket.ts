import type { Bucket } from '@/types';

export function lrNextBucket(bucket: Bucket): Bucket {
  return ((bucket + 1) % 3) as Bucket;
}
