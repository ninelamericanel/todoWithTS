import React from 'react';

import './TaskList.scss';
import { OnCompletedFunc, OnDeletedFunc } from 'types/app';
import { TodoItem } from 'types/todos';
import { Task } from 'components/Task';

type TodosProp = {
  todos: TodoItem[];
  onCompleted: OnCompletedFunc;
  onDeleted: OnDeletedFunc;
};

const TaskList: React.FC<TodosProp> = ({ todos, onCompleted, onDeleted }) => {
  const todosNodes = todos.map((item) => {
    const { id, created, description, status } = item;
    let classList = '';
    if (status === 'completed') classList += 'completed';
    // if (!display) classList += ' display-none';
    if (status === 'editing') classList = 'editing';
    return (
      <li className={classList} key={id}>
        <Task
          created={created}
          description={description}
          status={status}
          onDeleted={onDeleted}
          onCompleted={onCompleted}
          id={id}
        />
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
