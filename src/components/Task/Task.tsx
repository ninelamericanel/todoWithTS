import React, { FC, useContext, useState } from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';

import { EditInput } from 'components/EditInput';
import { Timer } from 'components/Timer';
import { PropsContext } from 'context/props-context';
import { NoParamsVoidFunc, Todo } from 'types/todos';

interface TaskProps {
  todo: Todo;
}

const Task: FC<TaskProps> = ({ todo: { id, created, sec, min, description, status } }) => {
  const [play, setPlay] = useState(false);
  const { onChangeStatusFunc, onDeletedFunc } = useContext(PropsContext);
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });
  const completed: boolean = status === 'completed';
  const turnOnTimer: NoParamsVoidFunc = () => {
    setPlay(false);
    onChangeStatusFunc(id, 'completed');
  };
  const disabledButtonPlay = (): boolean => (min === '00' && sec === '00') || completed;
  const editing = status === 'editing' ? <EditInput id={id} description={description} /> : null;
  const timer = play ? (
    <>
      <button onClick={() => setPlay(false)} className="icon icon-pause"></button>
      <Timer id={id} turnOnTimer={turnOnTimer} min={min} sec={sec} />
    </>
  ) : (
    <>
      <button onClick={() => setPlay(true)} disabled={disabledButtonPlay()} className="icon icon-play"></button>
      {min}:{sec}
    </>
  );

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onChangeStatusFunc(id, 'completed')}
        ></input>
        <div className="label">
          <span
            className="title"
            onClick={() => {
              onChangeStatusFunc(id, 'completed');
              setPlay(false);
            }}
          >
            {description}
          </span>
          <span className="description">{timer}</span>
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
