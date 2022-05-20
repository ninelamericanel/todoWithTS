import React, { useContext } from 'react';

import './TaskList.scss';
import { PropsContext } from 'context/props-context';
import { Todo } from 'types/todos';
import { Task } from 'components/Task';

interface TodosProp {}

const TaskList: React.FC<TodosProp> = () => {
  const context = useContext(PropsContext);
  const todosNodes = context.todos.map((todo: Todo) => {
    const { id, status, display } = todo;
    let classList = '';
    if (status === 'completed') classList += 'completed';
    if (!display) classList += ' display-none';
    if (status === 'edit') classList = 'editing';
    return (
      <li className={classList} key={id}>
        <Task />
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
