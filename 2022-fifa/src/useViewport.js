import { useState, useEffect } from 'react';

const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const handleRWD = () => {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleRWD);
    handleRWD();

    return () => {
      window.removeEventListener('resize', handleRWD);
    };
  }, []);

  return {
    viewportWidth,
    viewportHeight,
    // isWidtherThanMd: viewportWidth > 768,
    // isWidtherThanXl: viewportWidth > 1200,
  };
};

export default useViewportWidth;
