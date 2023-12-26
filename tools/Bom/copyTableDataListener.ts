type CleanupFunction = (text: string) => string;

interface CopyTableDataOptions {
  cleanupFunction?: CleanupFunction;
}
/**
 * @description 去除copy表格数据等情形带来的空格
 * @param options // options?.cleanupFunction 对粘贴数据的处理函数,默认是去除空格
 */
export const copyTableDataListener = (options?: CopyTableDataOptions): (() => void) => {
  const defaultCleanupFunction = (text: string): string => {
    return text.replace(/\s+/g, ' ');
  };
  const cleanupFunction = options?.cleanupFunction || defaultCleanupFunction;

  const onCopyTableData = (event: ClipboardEvent): void => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      const cleanedText = cleanupFunction(selection);
      event.preventDefault();
      navigator.clipboard.writeText(cleanedText).catch((err) => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  document.addEventListener('copy', onCopyTableData);

  // 返回一个函数，用于移除事件监听器
  return () => {
    document.removeEventListener('copy', onCopyTableData);
  };
};

// const removeListener = copyTableDataListener({
//   cleanupFunction: (text) => text.replace(/\s+/g, ' ')
// });

// removeListener();
