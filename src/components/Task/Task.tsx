import React, { FC, useContext, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.scss';

import { EditInput } from 'components/EditInput';
import { PropsContext } from 'context/props-context';
import { NoParamsVoidFunc, TimerFormatFunc, Todo } from 'types/todos';

import style from './style';

interface Props {
  todo: Todo;
}

const Task: FC<Props> = ({ todo: { id, created, display, initialSec, description, completed } }) => {
  const [play, setPlay] = useState(false);
  const [seconds, setSeconds] = useState(initialSec);
  const [edit, setEdit] = useState(false);
  const { onChangeTimerFunc, onCompletedFunc, onFilterTodosFunc, onDeletedFunc } = useContext(PropsContext);
  const turnOnTimer = () => {
    setPlay(false);
  };
  const clock = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else {
      turnOnTimer();
      onChangeTimerFunc(seconds, id);
      onCompletedFunc(id);
    }
  };

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => clock(), 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      onChangeTimerFunc(seconds, id);
    }
  }, [seconds, play]);
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });

  const timerFormat: TimerFormatFunc = (num) => (num < 10 ? '0' + num : num.toString());
  const handleChangeComplete: NoParamsVoidFunc = () => {
    onCompletedFunc(id);
    setPlay(false);
    onFilterTodosFunc();
  };
  const reset: NoParamsVoidFunc = () => setEdit(false);

  const handleClickButtonTimer = () => (!completed && seconds > 0 ? setPlay(true) : null);

  const buttonTimer = play ? (
    <button onClick={() => setPlay(false)} className="icon icon-pause" />
  ) : (
    <button onClick={handleClickButtonTimer} className="icon icon-play" />
  );

  const editing = edit ? <EditInput description={description} id={id} reset={reset} /> : null;
  return (
    <li className={style(completed, display, edit)}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleChangeComplete} />
        <div className="label">
          <span className="title" onClick={handleChangeComplete}>
            {description}
          </span>
          <span className="description">
            {buttonTimer}
            {`${timerFormat(Math.floor(seconds / 60))} : ${timerFormat(seconds % 60)}`}
          </span>
          <span className="description">created {date} ago</span>
        </div>
        <button className="icon icon-edit" title="edit" onClick={() => setEdit(true)} />
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeletedFunc(id)} />
      </div>
      {editing}
    </li>
  );
};

export default Task;
