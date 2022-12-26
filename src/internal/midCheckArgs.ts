export default function midOverloadedArgs(
  arg3: number | boolean | undefined,
  arg4: boolean | undefined,
) {
  if (typeof arg3 === 'number') {
    return { count: arg3, upwards: arg4 ?? true };
  }

  if (typeof arg3 === 'boolean') {
    return { count: undefined, upwards: arg3 };
  }

  return { count: undefined, upwards: arg4 ?? true };
}
