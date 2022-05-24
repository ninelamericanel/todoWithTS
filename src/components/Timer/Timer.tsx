import React, { Dispatch, FC, SetStateAction, useContext, useEffect } from 'react';

import { NoParamsVoidFunc } from 'types/todos';
import { PropsContext } from 'context/props-context';

interface TimerProps {
  timer: {
    timerMin: string;
    timerSec: string;
  };
  turnOnTimer: NoParamsVoidFunc;
  setTimer: Dispatch<SetStateAction<{ timerMin: string; timerSec: string }>>;
}

const Timer: FC<TimerProps> = ({ timer, setTimer, turnOnTimer }) => {
  const { timerFormatFunc } = useContext(PropsContext);
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
    };
  }, [timer]);

  return (
    <>
      {timer.timerMin}:{timer.timerSec}
    </>
  );
};

export default Timer;
