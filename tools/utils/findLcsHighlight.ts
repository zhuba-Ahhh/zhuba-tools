import { uuid } from '..';

// 最长公共子序列（Longest Common Subsequence, LCS）
export const findLcs = (str1: string, str2: string) => {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (): number[] =>
    new Array<number>(n + 1).fill(0)
  );
  // 构建 DP 表
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  // 回溯找到 LCS
  let lcs = '';
  for (let i = m, j = n; i > 0 && j > 0; ) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return lcs;
};

//高亮
export const highlight = (lcs: string, subStr: string): string => {
  //当前的值数组
  const subArr = [...subStr];
  //将相应的相同字符转换成在现在值中的位置的索引
  const indexArr = [...lcs]
    .map((ch) => {
      const index = subArr.findIndex((item) => item === ch);
      subArr[index] = uuid();
      return index;
    })
    .sort((a, b) => a - b);
  const diff: string[] = [];
  //转换
  for (let i = 0; i < indexArr.length; i++) {
    const start = indexArr[i];
    diff.push(subStr.charAt(start));
    if (i < indexArr.length - 1) {
      const end = indexArr[i + 1];
      if (end - start > 1) {
        diff.push(`<span style="color: #F33131">${subStr.slice(start + 1, end)}</span>`);
      }
    } else {
      if (start !== subStr.length - 1) {
        diff.push(`<span style="color: #F33131">${subStr.slice(start + 1)}</span>`);
      }
    }
  }
  return diff.join('');
};

// 高亮
export const highlight1 = (lcs: string, subStr: string): string => {
  const lcsChars = [...lcs];
  let currentIndex = 0;
  let result = '';

  for (const char of subStr) {
    if (lcsChars[currentIndex] === char) {
      result += char;
      currentIndex++;
    } else {
      result += `<span style="color: #F33131">${char}</span>`;
    }
  }

  return result;
};
