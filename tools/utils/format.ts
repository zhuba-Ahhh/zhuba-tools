export const formatToFixed = (money: string, decimals = 2) => {
  return (
    Math.round((parseFloat(money) + Number.EPSILON) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  ).toFixed(decimals);
};
export const format = {
  // 格式化金额展示： 12341234.246 -> $ 12,341,234.25
  formatMoney: (money: string, symbol = '', decimals = 2) =>
    formatToFixed(money, decimals)
      .replace(/\B(?=(\d{3})+\b)/g, ',')
      .replace(/^/, `${symbol}`)
};
