import React from 'react';

import { OnFilterTodosFunc, OnSelectedFilterFunc } from 'types/app';
import './TaskFilter.scss';

interface TaskFilterProps {
  name: string;
  selected: boolean;
  onSelectedFilter: OnSelectedFilterFunc;
  onFilterTodos: OnFilterTodosFunc;
}

type HandleClick = (name: string) => void;

const TaskFilter: React.FC<TaskFilterProps> = ({ name, selected, onFilterTodos, onSelectedFilter }) => {
  const classSelected = selected ? 'selected' : null;

  const handleClick: HandleClick = (value) => {
    onSelectedFilter(value);
    onFilterTodos(value);
  };

  return (
    <button className={classSelected || undefined} onClick={() => handleClick(name)}>
      {name}
    </button>
  );
};

export default TaskFilter;
