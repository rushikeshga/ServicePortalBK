// constants.js

import { useState, useEffect } from 'react';

export const usePathName = () => {
  const [pathName, setPathName] = useState('');

  useEffect(() => {
    const packageJson = require('../../package.json');
    setPathName(packageJson.homepage);
  }, []);

  return pathName;
};
