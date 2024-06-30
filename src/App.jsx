import { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import PhoneDevice from './components/PhoneDevice/PhoneDevice';
import Flex from './components/Flex/Flex';
import Display from './components/Display/Display';

const initialParams = {
  expressionOne: `0`,
  expressionTwo: null,
  calcType: '',
}

const mathOperators = {
  add: '+',
  subtract: '-',
  divide: `÷`,
  multiply: `×`,
  decimalPoint: `.`,
  comma: `,`,
  negateDisplayValue: `+/-`,
  percent: `%`,
}

const replaceCommaToPoint = (value) => value.replace(mathOperators.comma, mathOperators.decimalPoint)
const replacePointToComma = (value) => value.replace(mathOperators.decimalPoint, mathOperators.comma)


function App() {
  const [displayParams, setDisplayParams] = useState(initialParams);

  const scaleFontSize = (valueLength) => {
    let newFontSize = 46;

    if (valueLength > 7 && valueLength <= 11) {
      newFontSize = 46 - ((valueLength - 7) * 5);
    } else if (valueLength > 11) {
      newFontSize = 46 - ((valueLength - 7) * 4);
    }

    return newFontSize > 18 ? `${newFontSize}px` : `18px`;
  };

  const displayValue = displayParams.calcType !== '' && displayParams.expressionTwo
    ? displayParams.expressionTwo
    : displayParams.expressionOne;

  const fontSize = scaleFontSize(String(displayValue).length);

  const setNumber = (number) => {
    if (displayParams.calcType !== '') {
      setDisplayParams({
        ...displayParams,
        expressionTwo: displayParams.expressionTwo === initialParams.expressionTwo || displayParams.expressionTwo === `0`
          ? String(number)
          : displayParams.expressionTwo + number,
      })
    } else {
      setDisplayParams({
        ...displayParams,
        expressionOne: displayParams.expressionOne === initialParams.expressionOne
          ? String(number)
          : displayParams.expressionOne + number,
      })
    }
  }

  const setDecimalPoint = () => {
    const addPoint = (number) => !number.includes(mathOperators.comma) ? number + mathOperators.comma : number;

    if (displayParams.expressionOne !== 0 && displayParams.calcType !== '') {
      setDisplayParams({
        ...displayParams,
        expressionTwo: addPoint(displayParams.expressionTwo),
      })
    }
    else {
      setDisplayParams({
        ...displayParams,
        expressionOne: addPoint(displayParams.expressionOne),
      })
    }
  }

  const getCalculatedResult = () => {
    const numberA = Number(replaceCommaToPoint(displayParams.expressionOne));
    const numberB = Number(replaceCommaToPoint(displayParams.expressionTwo));

    let result = displayParams.expressionOne;

    switch (displayParams.calcType) {
      case mathOperators.add:
        result = numberA + numberB;
        break;
      case mathOperators.subtract:
        result = numberA - numberB;
        break;
      case mathOperators.multiply:
        result = numberA * numberB;
        break;
      case mathOperators.divide:
        result = numberA / numberB;
        break;
      default:
        console.error(`Error: no known math commands found`);
    }

    return replacePointToComma(String(result));
  }

  const calcResult = () => {
    setDisplayParams({
      ...initialParams,
      expressionOne: getCalculatedResult(),
    })
  }

  const setPercent = () => {
    if (displayParams.calcType === '') {
      setDisplayParams({
        ...displayParams, expressionOne: replacePointToComma(`${Number(replaceCommaToPoint(displayParams.expressionOne)) / 100}`)
      })
    } else {
      setDisplayParams({
        ...displayParams, expressionTwo: replacePointToComma(`${Number(replaceCommaToPoint(displayParams.expressionTwo)) / 100}`)
      })

    }
  }

  const setCalcType = (calcType) => {
    if (displayParams.expressionTwo) {
      setDisplayParams({
        expressionOne: getCalculatedResult(),
        expressionTwo: null,
        calcType,
      })
    } else {
      setDisplayParams({
        ...displayParams,
        calcType,
      })
    }

  }

  const negateDisplayValue = () => {
    if (displayParams.calcType === '') {
      setDisplayParams({
        ...displayParams,
        expressionOne: `${Number(displayParams.expressionOne) - Number(displayParams.expressionOne) - Number(displayParams.expressionOne)}`
      })
    } else {
      setDisplayParams({
        ...displayParams,
        expressionTwo: `${Number(displayParams.expressionTwo) - Number(displayParams.expressionTwo) - Number(displayParams.expressionTwo)}`
      })
    }
  }

  console.log(`displayParams`, displayParams)

  return (
    <PhoneDevice align='center' direction='column' justify='center'>
      <Display fontSize={fontSize} value={displayValue} />
      <Flex gap={7} direction='column'>
        <Flex gap={7}>
          <Button variant='light-grey' onClick={() => setDisplayParams(initialParams)}>C</Button>
          <Button variant="light-grey" onClick={() => negateDisplayValue()}>
            <span style={{ position: `relative` }}>
              <sub className='button-plus'>+</sub><sup className='button-minus'>-</sup>
            </span>
          </Button>
          <Button variant='light-grey' onClick={() => setPercent(mathOperators.percent)}>{mathOperators.percent}</Button>
          <Button variant='orange' onClick={() => setCalcType(mathOperators.divide)}>{mathOperators.divide}</Button>
        </Flex>
        <Flex gap={7}>
          <Button variant='grey' onClick={() => setNumber(7)}>7</Button>
          <Button variant='grey' onClick={() => setNumber(8)}>8</Button>
          <Button variant='grey' onClick={() => setNumber(9)}>9</Button>
          <Button variant='orange' onClick={() => setCalcType(mathOperators.multiply)}>{mathOperators.multiply}</Button>
        </Flex>
        <Flex gap={7}>
          <Button variant='grey' onClick={() => setNumber(4)}>4</Button>
          <Button variant='grey' onClick={() => setNumber(5)}>5</Button>
          <Button variant='grey' onClick={() => setNumber(6)}>6</Button>
          <Button variant='orange' onClick={() => setCalcType(mathOperators.subtract)}>{mathOperators.subtract}</Button>
        </Flex>
        <Flex gap={7}>
          <Button variant='grey' onClick={() => setNumber(1)}>1</Button>
          <Button variant='grey' onClick={() => setNumber(2)}>2</Button>
          <Button variant='grey' onClick={() => setNumber(3)}>3</Button>
          <Button variant='orange' onClick={() => setCalcType(mathOperators.add)}>{mathOperators.add}</Button>
        </Flex>
        <Flex gap={7}>
          <Button variant='grey' size='double' onClick={() => setNumber(0)}>0</Button>
          <Button variant='grey' onClick={() => setDecimalPoint()}>{mathOperators.decimalPoint}</Button>
          <Button variant='orange' onClick={() => calcResult()}>=</Button>
        </Flex>
      </Flex>
    </PhoneDevice >
  )
}

export default App
