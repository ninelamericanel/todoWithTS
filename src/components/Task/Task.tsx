import React, { useState } from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';

import {
  OnDeletedFunc,
  OnCompletedFunc,
  OnEditingFunc,
  EditingTaskFunc,
  TimerFormatFunc,
  OnChangeTimerFunc,
} from 'types/app';

import { EditInput } from '../EditInput';
import { Timer } from '../Timer';

interface TaskProps {
  id: string;
  created: Date;
  description: string;
  status: string;
  onDeleted: OnDeletedFunc;
  onCompleted: OnCompletedFunc;
  onEditing: OnEditingFunc;
  editingTask: EditingTaskFunc;
  timer: { min: string; sec: string };
  timerFormat: TimerFormatFunc;
  onChangeTimer: OnChangeTimerFunc;
}

export type TurnOnTimerFunc = () => void;
type DisabledButtonPlayFunc = () => boolean;

const Task: React.FC<TaskProps> = ({
  created,
  description,
  status,
  onDeleted,
  editingTask,
  onEditing,
  id,
  onCompleted,
  timer: { min, sec },
  timerFormat,
  onChangeTimer,
}) => {
  const [play, setPlay] = useState(false);
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });
  const completed: boolean = status === 'completed';
  const turnOnTimer: TurnOnTimerFunc = () => {
    setPlay(false);
    onCompleted(id);
  };
  const disabledButtonPlay: DisabledButtonPlayFunc = () => (min === '00' && sec === '00') || completed;
  const editing =
    status === 'editing' ? <EditInput id={id} description={description} editingTask={editingTask} /> : null;
  const timer =
    play && !completed ? (
      <>
        <button onClick={() => setPlay(false)} className="icon icon-pause"></button>
        <Timer
          id={id}
          turnOnTimer={turnOnTimer}
          min={min}
          sec={sec}
          timerFormat={timerFormat}
          onChangeTimer={onChangeTimer}
        />
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
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onCompleted(id)}></input>
        <div className="label">
          <span className="title" onClick={() => onCompleted(id)}>
            {description}
          </span>
          <span className="description">{timer}</span>
          <span className="description">created {date} ago</span>
        </div>
        <button className="icon icon-edit" title="edit" onClick={() => onEditing(id)}></button>
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeleted(id)}></button>
      </div>
      {editing}
    </>
  );
};

export default Task;
