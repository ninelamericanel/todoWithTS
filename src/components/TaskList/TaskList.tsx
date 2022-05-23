import React from 'react';

import './TaskList.scss';
import { Todo } from 'types/todos';
import { Task } from 'components/Task';

interface TodosProp {
  todos: Todo[];
}

const TaskList: React.FC<TodosProp> = ({ todos }) => {
  const todosNodes = todos.map((todo: Todo) => {
    const { id, status, display } = todo;
    let classList = '';
    if (status === 'completed') classList += 'completed';
    if (!display) classList += ' display-none';
    if (status === 'editing') classList = 'editing';
    return (
      <li className={classList} key={id}>
        <Task todo={todo} />
      </li>
    );
  });
  return (
    <section className="main">
      <ul className="todo-list">{todosNodes}</ul>
    </section>
  );
};

export default TaskList;
