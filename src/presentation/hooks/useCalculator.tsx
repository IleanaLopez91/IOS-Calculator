/* eslint-disable prettier/prettier */ /* eslint-disable no-trailing-spaces */
/* eslint-disable curly */

import {useState} from 'react';

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };
  return {
    number,
    buildNumber,
  };
};
