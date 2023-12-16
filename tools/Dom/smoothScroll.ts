export const smoothScroll = (element: string) => {
  document.querySelector(element)?.scrollIntoView({
    behavior: 'smooth'
  });
};
