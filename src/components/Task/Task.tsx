import React from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';

import { OnDeletedFunc, OnCompletedFunc } from 'types/app';

type TaskProps = {
  id: string;
  created: Date;
  description: string;
  completed: boolean;
  onDeleted: OnDeletedFunc;
  onCompleted: OnCompletedFunc;
};

const Task: React.FC<TaskProps> = ({ created, description, completed, onDeleted, id, onCompleted }) => {
  const date = formatDistanceToNow(new Date(created), { includeSeconds: true });

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={completed} onChange={() => onCompleted(id)}></input>
      <label>
        <span className="description" onClick={() => onCompleted(id)}>
          {description}
        </span>
        <span className="created">created {date} ago</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
    </div>
    // <input type="text" className="edit" value={description}></input>
  );
};

export default Task;
