import React, { FC, useContext, useEffect, useState } from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';

import { EditInput } from 'components/EditInput';
import { Timer } from 'components/Timer';
import { PropsContext } from 'context/props-context';
import { DisabledButtonPlayFunc, NoParamsVoidFunc, Todo } from 'types/todos';

interface TaskProps {
  todo: Todo;
}

const Task: FC<TaskProps> = ({ todo: { id, created, initialSec, initialMin, description, status } }) => {
  const [play, setPlay] = useState(false);
  const [timer, setTimer] = useState({
    timerMin: initialMin,
    timerSec: initialSec,
  });
  const { timerMin, timerSec } = timer;
  const { onChangeTimerFunc, onChangeStatusFunc, onDeletedFunc, onFilterTodosFunc } = useContext(PropsContext);
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });
  const completed: boolean = status === 'completed';
  useEffect(() => onChangeTimerFunc(timerMin, timerSec, id), [play]);
  const turnOnTimer: NoParamsVoidFunc = () => {
    setPlay(false);
    onChangeStatusFunc(id, 'completed');
  };

  const disabledButtonPlay: DisabledButtonPlayFunc = () => {
    return (initialMin === '00' && initialSec === '00') || (timerSec === '00' && timerMin === '00') || completed;
  };
  const editing = status === 'editing' ? <EditInput id={id} description={description} /> : null;
  const timerView = play ? (
    <>
      <button onClick={() => setPlay(false)} className="icon icon-pause"></button>
      <Timer turnOnTimer={turnOnTimer} timer={timer} setTimer={setTimer} />
    </>
  ) : (
    <>
      <button onClick={() => setPlay(true)} disabled={disabledButtonPlay()} className="icon icon-play"></button>
      {timerMin}:{timerSec}
    </>
  );

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => {
            onChangeStatusFunc(id, 'completed');
            setPlay(false);
            onFilterTodosFunc();
          }}
        ></input>
        <div className="label">
          <span
            className="title"
            onClick={() => {
              onChangeStatusFunc(id, 'completed');
              setPlay(false);
              onFilterTodosFunc();
            }}
          >
            {description}
          </span>
          <span className="description">{timerView}</span>
          <span className="description">created {date} ago</span>
        </div>
        <button
          className="icon icon-edit"
          title="edit"
          onClick={() => onChangeStatusFunc(id, 'editing')}
          disabled={completed}
        ></button>
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeletedFunc(id)}></button>
      </div>
      {editing}
    </>
  );
};

export default Task;
