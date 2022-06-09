import React, { FC, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.scss';

import { EditInput } from 'components/EditInput';
import {
  EditingTaskFunc,
  HandleClickButtonTimerFunc,
  HandleEditTask,
  NoParamsVoidFunc,
  OnChangeTimerFunc,
  OnCompletedFunc,
  OnDeletedFunc,
  OnFilterTodosFunc,
  TimerFormatFunc,
  Todo,
} from 'types/todos';

import style from './style';

interface Props {
  todo: Todo;
  editingTask: EditingTaskFunc;
  onChangeTimer: OnChangeTimerFunc;
  onCompleted: OnCompletedFunc;
  onFilterTodos: OnFilterTodosFunc;
  onDeleted: OnDeletedFunc;
}

const Task: FC<Props> = ({
  editingTask,
  onChangeTimer,
  onCompleted,
  onFilterTodos,
  onDeleted,
  todo: { id, created, display, initialSec, description, completed },
}) => {
  const [play, setPlay] = useState(false);
  const [seconds, setSeconds] = useState(initialSec);
  const [edit, setEdit] = useState(false);
  const turnOnTimer: NoParamsVoidFunc = () => setPlay(false);
  const clock: NoParamsVoidFunc = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else {
      turnOnTimer();
      onChangeTimer(seconds, id);
      onCompleted(id);
    }
  };
  useEffect(() => {
    if (play) {
      const interval = setInterval(() => clock(), 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      onChangeTimer(seconds, id);
    }
  }, [seconds, play]);
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });
  const timerFormat: TimerFormatFunc = (num) => (num < 10 ? '0' + num : num.toString());
  const handleChangeComplete: NoParamsVoidFunc = () => {
    onCompleted(id);
    setPlay(false);
    onFilterTodos();
  };
  const reset: NoParamsVoidFunc = () => setEdit(false);
  const handleClickButtonTimer: HandleClickButtonTimerFunc = () => (!completed && seconds > 0 ? setPlay(true) : null);
  const handleEditTask: HandleEditTask = (value) => {
    editingTask(value, id);
    setEdit(false);
  };

  const buttonTimer = play ? (
    <button onClick={() => setPlay(false)} className="icon icon-pause" />
  ) : (
    <button onClick={handleClickButtonTimer} className="icon icon-play" />
  );

  const editing = edit ? <EditInput description={description} reset={reset} handleEditTask={handleEditTask} /> : null;
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
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeleted(id)} />
      </div>
      {editing}
    </li>
  );
};

export default Task;
