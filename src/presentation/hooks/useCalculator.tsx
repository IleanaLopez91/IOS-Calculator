/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */

import {useEffect, useRef, useState} from 'react';

enum Operator {
  //add,
  //subtract,
  //multiply,
  //divide,
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');
  const lastOperator = useRef<Operator>();

  useEffect(() => {
    if (lastOperator.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperator.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`);
  }, [formula]);

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperator.current = undefined;
    setFormula('');
  };

  const deleteOparation = () => {
    let currentSing = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSing = '-';
      temporalNumber = number.substring(1);
    }
    if (temporalNumber.length > 1) {
      return setNumber(currentSing + temporalNumber.slice(0, -1));
    }
    setNumber('0');
  };

  const toggleSing = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

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

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.divide;
  };

  const subtrackOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.subtract;
  };

  const multiplyOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.multiply;
  };

  const addOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.add;
  };

  const calculateResult = () => {
    /*const num1 = Number(number);
    const num2 = Number(prevNumber);

    switch (lastOperator.current) {
      case Operator.add:
        setNumber(`${num1 + num2}`);
        break;

      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;

      case Operator.subtract:
        setNumber(`${num2 - num1}`);
        break;

      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;

      default:
        throw new Error('Operation not implemented');
    }*/
    const result = calculateSubResult();
    setFormula(`${result}`);
    lastOperator.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValue] = formula.split(' ');
    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;

      case Operator.divide:
        return num1 / num2;

      case Operator.subtract:
        return num1 - num2;

      case Operator.multiply:
        return num1 * num2;

      default:
        throw new Error('Operation not implemented');
    }
  };

  return {
    number,
    prevNumber,
    formula,
    buildNumber,
    clean,
    deleteOparation,
    toggleSing,
    divideOperator,
    subtrackOperator,
    multiplyOperator,
    addOperator,
    calculateResult,
  };
};
