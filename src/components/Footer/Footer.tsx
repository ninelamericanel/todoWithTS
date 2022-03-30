import React from 'react';
import './Footer.scss';

import { TaskFilter } from 'components/TaskFilter';
import { ClearCompleteFunc, OnFilterTodosFunc, OnSelectedFilterFunc } from 'types/app';
import { FilterButtons, TodoItem } from 'types/todos';

interface FooterProps {
  todos: TodoItem[];
  buttons: FilterButtons[];
  clearComplete: ClearCompleteFunc;
  onSelectedFilter: OnSelectedFilterFunc;
  onFilterTodos: OnFilterTodosFunc;
}

const Footer: React.FC<FooterProps> = ({ todos, clearComplete, buttons, onSelectedFilter, onFilterTodos }) => {
  const buttonsArray = buttons.map((item) => {
    const { name, selected } = item;
    return (
      <li key={name}>
        <TaskFilter name={name} selected={selected} onFilterTodos={onFilterTodos} onSelectedFilter={onSelectedFilter} />
      </li>
    );
  });

  const countLeft = todos.filter((item) => item.status === 'completed').length;

  return (
    <footer className="footer">
      <span className="todo-count">{countLeft} items left</span>
      <ul className="filters">{buttonsArray}</ul>
      <button className="clear-completed" onClick={clearComplete}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
