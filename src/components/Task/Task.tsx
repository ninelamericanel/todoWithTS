import React from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';

import { OnDeletedFunc, OnCompletedFunc, OnEditingFunc, EditingTaskFunc } from 'types/app';

import { EditInput } from '../EditInput';

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
}

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
}) => {
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });
  const completed: boolean = status === 'completed';
  const editing =
    status === 'editing' ? <EditInput id={id} description={description} editingTask={editingTask} /> : null;

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onCompleted(id)}></input>
        <label>
          <span className="title" onClick={() => onCompleted(id)}>
            {description}
          </span>
          <span className="description">
            <button className="icon icon-play"></button>
            <button className="icon icon-pause"></button>
            {min}:{sec}
          </span>
          <span className="description">created {date} ago</span>
        </label>
        <button className="icon icon-edit" title="edit" onClick={() => onEditing(id)}></button>
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeleted(id)}></button>
      </div>
      {editing}
    </>
  );
};

export default Task;
