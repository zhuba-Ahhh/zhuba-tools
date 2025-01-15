import { useEffect, useMemo, useState } from 'react';
import TypeWriterCore from './TypeWriterCore';

interface UseWriterOptions {
  maxStepSeconds?: number; // 将 maxStepSeconds 定义为可选的
  use?: boolean;
}

export const useTypeWriter = ({ text, options }: { text: string; options?: UseWriterOptions }) => {
  const [typedText, setTypedText] = useState('');

  const typingCore = useMemo(
    () =>
      new TypeWriterCore({
        onConsume: (str: string) => setTypedText((prev) => prev + str),
        ...options
      }),
    []
  );

  useEffect(() => {
    if (typingCore) {
      typingCore?.onRendered(); // 渲染完成 => 清空定时器
      typingCore?.add(text);
      typingCore?.start();
    }

    return () => typingCore && typingCore?.onRendered?.(); // 渲染完成 => 清空定时器
  }, [text]);

  return [typedText];
};
