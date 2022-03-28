import React from 'react';

import { OnFilterTodosFunc, OnSelectedFilterFunc } from 'componentTypes/app';
import './style.css';

type TaskFilterProps = {
  name: string;
  selected: boolean;
  onSelectedFilter: OnSelectedFilterFunc;
  onFilterTodos: OnFilterTodosFunc;
};

type HandleClick = (name: string) => void;

export const TaskFilter: React.FC<TaskFilterProps> = ({ name, selected, onFilterTodos, onSelectedFilter }) => {
  let classSelected = selected ? 'selected' : null;

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
