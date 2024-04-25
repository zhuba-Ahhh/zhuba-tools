/**
 *
 * @param len 长度
 * @param pre 前缀
 * @returns uuid
 */
export const uuid = (len = 6, pre = 'u_'): string => {
  const seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
};

/**
 *
 * @param pre 前缀
 * @returns uuid
 */
export function uuid1(pre = 'u_'): string {
  return pre + Date.now().toString(36) + Math.floor(Math.random() * 10000).toString(36);
}
