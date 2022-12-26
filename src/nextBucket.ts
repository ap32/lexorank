import type { Bucket } from '@/types';

export default function nextBucket(bucket: Bucket): Bucket {
  return ((bucket + 1) % 3) as Bucket;
}
