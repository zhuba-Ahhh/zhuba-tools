import { useEffect, useRef, useState } from 'react';
interface IProps {
  /**
   * 倒计时(秒)
   */
  time?: number;
  /**
   * 结束的回调
   */
  onEnd?: () => void;
}
export default function useCountDown(props: IProps) {
  const { time, onEnd = () => {} } = props;
  // 泛型
  const timeId = useRef<{ id: number }>({ id: -1 });
  const [count, setCount] = useState(0);

  const start = () => {
    if (typeof time !== 'number') return;
    setCount(time);
    timeId.current.id = window.setInterval(() => {
      setCount((pre: number) => pre - 1);
    }, 1000);
  };

  const stop = () => {
    setCount(0);
    clearInterval(timeId.current?.id);
  };
  useEffect(() => {
    return () => {
      clearInterval(timeId.current?.id);
    };
  }, []);

  useEffect(() => {
    if (count <= 0) {
      clearInterval(timeId.current?.id);
      onEnd?.();
    }
  }, [count]);

  return [count, start, stop] as const;
}
