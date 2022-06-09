import React, { FC, useContext, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.scss';

import { EditInput } from 'components/EditInput';
import { PropsContext } from 'context/props-context';
import { TimerFormatFunc, Todo } from 'types/todos';

import style from './style';

interface Props {
  todo: Todo;
}

const Task: FC<Props> = ({ todo: { id, created, display, initialSec, description, status } }) => {
  const [play, setPlay] = useState(false);
  const [timer, setTimer] = useState(initialSec);
  const { onChangeTimerFunc } = useContext(PropsContext);
  const turnOnTimer = () => {
    setPlay(false);
  };
  const clock = () => {
    if (timer === 0) {
      turnOnTimer();
      onChangeTimerFunc(timer, id);
    }
    setTimer(timer - 1);
  };

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => clock(), 1000);
      return () => {
        onChangeTimerFunc(timer, id);
        clearInterval(interval);
      };
    }
  }, [timer, play]);
  const completed = status === 'completed';
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });

  const { onChangeStatusFunc, onFilterTodosFunc, onDeletedFunc } = useContext(PropsContext);
  const timerFormat: TimerFormatFunc = (num) => (num < 10 ? '0' + num : num.toString());
  const handleChange = () => {
    onChangeStatusFunc(id, 'completed');
    setPlay(false);
    onFilterTodosFunc();
  };

  const button = play ? (
    <button onClick={() => setPlay(false)} className="icon icon-pause" />
  ) : (
    <button onClick={() => setPlay(true)} className="icon icon-play" />
  );

  const editing = status === 'editing' ? <EditInput description={description} id={id} /> : null;
  return (
    <li className={style(status, display)}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleChange} />
        <div className="label">
          <span className="title" onClick={handleChange}>
            {description}
          </span>
          <span className="description">
            {button}
            {`${timerFormat(Math.floor(timer / 60))} : ${timerFormat(timer % 60)}`}
          </span>
          <span className="description">created {date} ago</span>
        </div>
        <button className="icon icon-edit" title="edit" onClick={() => onChangeStatusFunc(id, 'editing')} />
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeletedFunc(id)} />
      </div>
      {editing}
    </li>
  );
};

export default Task;
