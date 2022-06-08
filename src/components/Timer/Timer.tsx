import React, { FC, useContext, useEffect, useState } from 'react';

import { PropsContext } from 'context/props-context';
import { TimerFormatFunc } from 'types/todos';

interface Props {
  initialSec: number;
  turnOnTimer: () => void;
  id: string;
  timerFormat: TimerFormatFunc;
}

const Timer: FC<Props> = ({ initialSec, turnOnTimer, id, timerFormat }) => {
  const [timer, setTimer] = useState(initialSec);
  const { onChangeTimerFunc } = useContext(PropsContext);
  const clock = () => {
    if (timer === 0) {
      turnOnTimer();
      onChangeTimerFunc(timer, id);
    }
    setTimer(timer - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => clock(), 1000);
    return () => {
      onChangeTimerFunc(timer, id);
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <>
      {timerFormat(Math.floor(timer / 60))} : {timerFormat(timer % 60)}
    </>
  );
};

export default Timer;
