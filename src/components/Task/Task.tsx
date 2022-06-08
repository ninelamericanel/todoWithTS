import React, { FC, useContext, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.scss';

import { EditInput } from 'components/EditInput';
import { PropsContext } from 'context/props-context';
import { TimerFormatFunc, Todo } from 'types/todos';
import { Timer } from 'components/Timer';

import style from './style';

interface Props {
  todo: Todo;
}

const Task: FC<Props> = ({ todo: { id, created, display, initialSec, description, status } }) => {
  const [play, setPlay] = useState(false);
  const [timer, setTimer] = useState({
    timerMin: initialMin,
    timerSec: initialSec,
  });
  const { timerMin, timerSec } = timer;
  const { onChangeTimerFunc, onChangeStatusFunc, onDeletedFunc, onFilterTodosFunc } = useContext(PropsContext);
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });
  const completed = status === 'completed';
  const button = play ? (
    <button onClick={() => setPlay(false)} className="icon icon-pause" />
  ) : (
    <button onClick={() => setPlay(true)} className="icon icon-play" />
  );
  const turnOnTimer = () => {
    setPlay(false);
  };
  const viewTimer = play ? (
    <Timer initialSec={initialSec} turnOnTimer={turnOnTimer} id={id} timerFormat={timerFormat} />
  ) : (
    `${timerFormat(Math.floor(initialSec / 60))} : ${timerFormat(initialSec % 60)}`
  );
  const editing = edit ? <EditInput description={description} id={id} /> : null;
  const handleChange = () => {
    onChangeStatusFunc(id, 'completed');
    setPlay(false);
    onFilterTodosFunc();
  };
  console.log(editing);
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
            {viewTimer}
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
