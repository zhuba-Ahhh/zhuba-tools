export const noRepeat = <T>(arr: Iterable<T> | null | undefined): T[] => {
  if (!arr) {
    return [];
  }
  return [...new Set(arr)];
};
