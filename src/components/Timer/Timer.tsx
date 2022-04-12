import React, { Component } from 'react';

import './Timer.scss';
import { OnChangeTimerFunc, TimerFormatFunc } from 'types/app';

import { TurnOnTimerFunc } from '../Task/Task';

interface TimerProps {
  min: string;
  sec: string;
  timerFormat: TimerFormatFunc;
  onChangeTimer: OnChangeTimerFunc;
  turnOnTimer: TurnOnTimerFunc;
  id: string;
}

type TimerState = {
  timerMin: string;
  timerSec: string;
};

type CountDownFunc = () => void;

export default class Timer extends Component<TimerProps, TimerState> {
  state: TimerState = {
    timerMin: this.props.min,
    timerSec: this.props.sec,
  };

  componentDidMount() {
    // @ts-ignore
    this.interval = setInterval(() => this.countDown(), 1000);
  }

  componentWillUnmount() {
    const { id, onChangeTimer } = this.props;
    onChangeTimer(this.state.timerMin, this.state.timerSec, id);
    // @ts-ignore
    clearInterval(this.interval);
  }

  countDown: CountDownFunc = () => {
    const { timerMin, timerSec } = this.state;
    const { timerFormat, turnOnTimer } = this.props;
    if (timerSec === '00' && +timerMin > 0) {
      this.setState({
        timerMin: timerFormat(+timerMin - 1),
        timerSec: '59',
      });
    }
    if (+timerSec > 0 && +timerMin >= 0) {
      this.setState({
        timerSec: timerFormat(+timerSec - 1),
      });
    }
    if (timerSec === '00' && timerMin === '00') {
      turnOnTimer();
    }
  };

  render() {
    const { timerMin, timerSec } = this.state;
    return (
      <>
        {timerMin}:{timerSec}
      </>
    );
  }
}
