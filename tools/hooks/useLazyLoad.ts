import { useEffect } from 'react';

const useLazyLoad = () => {
  useEffect(() => {
    const handleLazyLoad = () => {
      const imgs = document.querySelectorAll('img');
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const winHeight = window.innerHeight;
      
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].offsetTop < scrollTop + winHeight) {
          imgs[i].src = imgs[i].getAttribute('data-src') || '';
        }
      }
    };

    window.addEventListener('scroll', handleLazyLoad);

    return () => {
      window.removeEventListener('scroll', handleLazyLoad);
    };
  }, []); 

};

export default useLazyLoad;
