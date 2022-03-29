import React from 'react';
import './style.css';

import TaskFilter from 'components/taskFilter';
import { ClearCompleteFunc, OnFilterTodosFunc, OnSelectedFilterFunc } from 'componentTypes/app';
import { FilterBtns, TodoItem } from 'componentTypes/todos';

type FooterProps = {
  todos: TodoItem[];
  btns: FilterBtns[];
  clearComplete: ClearCompleteFunc;
  onSelectedFilter: OnSelectedFilterFunc;
  onFilterTodos: OnFilterTodosFunc;
};

export const Footer: React.FC<FooterProps> = ({ todos, clearComplete, btns, onSelectedFilter, onFilterTodos }) => {
  const btnsArray = btns.map((item) => {
    const { name, selected } = item;
    return (
      <li key={name}>
        <TaskFilter name={name} selected={selected} onFilterTodos={onFilterTodos} onSelectedFilter={onSelectedFilter} />
      </li>
    );
  });

  const countLeft = todos.filter((item) => item.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">{countLeft} items left</span>
      <ul className="filters">{btnsArray}</ul>
      <button className="clear-completed" onClick={() => clearComplete()}>
        Clear completed
      </button>
    </footer>
  );
};
