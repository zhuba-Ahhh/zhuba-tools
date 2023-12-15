/**
 * 判断当前位置是否为页面底部
 * @returns boolean
 */
export const bottomVisible = () => {
  return (
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  );
};
