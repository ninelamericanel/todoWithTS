import React, { FC, useContext, useEffect, useState } from 'react';

import { NoParamsVoidFunc } from 'types/todos';
import { PropsContext } from 'context/props-context';

interface TimerProps {
  min: string;
  sec: string;
  turnOnTimer: NoParamsVoidFunc;
  id: string;
}

const Timer: FC<TimerProps> = ({ id, min, sec, turnOnTimer }) => {
  const [timer, setTimer] = useState({
    timerMin: min,
    timerSec: sec,
  });
  const { timerFormatFunc, onChangeTimerFunc } = useContext(PropsContext);

  const countDown: NoParamsVoidFunc = () => {
    const { timerMin, timerSec } = timer;
    if (timerSec === '00' && +timerMin > 0) {
      setTimer({
        timerMin: timerFormatFunc(+timerMin - 1),
        timerSec: '59',
      });
    }
    if (+timerSec > 0 && +timerMin >= 0) {
      setTimer({
        ...timer,
        timerSec: timerFormatFunc(+timerSec - 1),
      });
    }
    if (timerSec === '00' && timerMin === '00') {
      turnOnTimer();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => countDown(), 1000);
    return () => {
      clearInterval(interval);
      onChangeTimerFunc(timer.timerMin, timer.timerSec, id);
    };
  }, [timer]);

  return (
    <>
      {timer.timerMin}:{timer.timerSec}
    </>
  );
};

export default Timer;
