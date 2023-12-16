/**
 *
 * @param api
 * @param params
 * @param fileName
 * @param type
 * @returns
 */
export const downloadFile = async (
  api: string,
  params: Record<string, any>,
  fileName: string,
  type: 'get' | 'post' = 'get'
) => {
  try {
    // 构建查询字符串
    const queryString = new URLSearchParams(params).toString();
    const url = type === 'get' ? `${api}?${queryString}` : api;

    // 发起 fetch 请求
    const response = await fetch(url, {
      method: type,
      ...(type === 'post' && { body: JSON.stringify(params) })
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const contentDisposition = response.headers.get('content-disposition');
    if (!contentDisposition) {
      return;
    }

    let suffix = '';
    if (contentDisposition.lastIndexOf('.')) {
      if (!fileName) {
        fileName = decodeURI(
          contentDisposition.substring(
            contentDisposition.indexOf('=') + 1,
            contentDisposition.lastIndexOf('.')
          )
        );
      }
      suffix = contentDisposition.substring(
        contentDisposition.lastIndexOf('.'),
        contentDisposition.length
      );
    }

    // 获取 blob 数据
    const blobData = await response.blob();

    const objectURL = window.URL.createObjectURL(blobData);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = objectURL;
    link.setAttribute('download', fileName + suffix);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectURL);
  } catch (err: any) {
    console.error(`Error while downloading file: ${err}`);
  }
};
// downloadFile('/api/download', {id}, '文件名')
