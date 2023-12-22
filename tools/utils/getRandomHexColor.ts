type ColorFormat = 'hex' | 'rgb' | 'rgba';

/**
 * @description 随机生成颜色
 * @param format 'hex' | 'rgb' | 'rgba' 格式
 * @returns
 */
export const getRandomColor = (format: ColorFormat = 'hex'): string => {
  const randomNum = () => Math.floor(Math.random() * 256);

  switch (format) {
    case 'hex':
      return `#${Array.from(
        { length: 6 },
        () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
      ).join('')}`;

    case 'rgb':
      return `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

    case 'rgba':
      return `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, ${Math.random().toFixed(1)})`;

    default:
      throw new Error('Unsupported color format');
  }
};
