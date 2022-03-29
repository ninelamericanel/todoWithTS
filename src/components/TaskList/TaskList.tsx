import React from 'react';

import './style.css';
import { OnCompletedFunc, OnDeletedFunc } from 'componentTypes/app';
import { TodoItem } from 'componentTypes/todos';
import { Task } from 'components/Task';

type TodosProp = {
  todos: TodoItem[];
  onCompleted: OnCompletedFunc;
  onDeleted: OnDeletedFunc;
};

export const TaskList: React.FC<TodosProp> = ({ todos, onCompleted, onDeleted }) => {
  const todosNodes = todos.map((item) => {
    const { id, completed, editing, created, description, display } = item;
    let classList = '';
    if (completed) classList += 'completed';
    if (!display) classList += ' display-none';
    if (editing) classList = 'editing';
    return (
      <li className={classList} key={id}>
        <Task
          created={created}
          description={description}
          completed={completed}
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
