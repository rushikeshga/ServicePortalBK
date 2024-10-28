import { useEffect } from 'react';

const useBackButtonHandler = (callback) => {
  useEffect(() => {
    const handlePopState = () => {
      callback();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callback]);
};

export default useBackButtonHandler;
