import { useEffect } from 'react';

/**
 * @param dep 监听依赖（可选，默认为空数组）
 * @description 重载页面 未保存数据提示
 */
export const useBeforeUnload = (dep: boolean[] = []) => {
  useEffect(() => {
    const beforeunload = (e: BeforeUnloadEvent) => {
      if (dep.some((condition) => condition)) {
        e.preventDefault();
        e.returnValue = ''; // 在某些浏览器中设置 returnValue 也是必要的
      }
    };

    window.addEventListener('beforeunload', beforeunload);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    };
  }, [dep]); // 依赖数组
};
