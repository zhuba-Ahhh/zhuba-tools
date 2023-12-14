export const hideMobile = (mobile: string) => {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
};
