export const quickSort = <T>(arr: T[]): T[] => {
  if (arr.length < 2) {
    return arr;
  }
  const left = [],
    right = [],
    cur = arr.splice(0, 1);
  for (const item of arr) {
    item > cur ? right.push(item) : left.push(item);
  }

  return quickSort(left).concat(cur, quickSort(right));
};
