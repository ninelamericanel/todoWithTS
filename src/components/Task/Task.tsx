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
          <span className="description" onClick={() => onCompleted(id)}>
            {description}
          </span>
          <span className="created">created {date} ago</span>
        </label>
        <button className="icon icon-edit" title="edit" onClick={() => onEditing(id)}></button>
        <button className="icon icon-destroy" title="destroy" onClick={() => onDeleted(id)}></button>
      </div>
      {editing}
    </>
  );
};

export default Task;
