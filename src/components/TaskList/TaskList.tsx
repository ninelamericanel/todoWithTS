import React from 'react';

import './TaskList.scss';
import { OnCompletedFunc, OnDeletedFunc, OnEditingFunc } from 'types/app';
import { TodoItem } from 'types/todos';
import { Task } from 'components/Task';

interface TodosProp {
  todos: TodoItem[];
  onCompleted: OnCompletedFunc;
  onDeleted: OnDeletedFunc;
  onEditing: OnEditingFunc;
}

const TaskList: React.FC<TodosProp> = ({ todos, onCompleted, onDeleted, onEditing }) => {
  const todosNodes = todos.map((item) => {
    const { id, created, description, status, display } = item;
    let classList = '';
    if (status === 'completed') classList += 'completed';
    if (!display) classList += ' display-none';
    if (status === 'editing') classList = 'editing';
    return (
      <li className={classList} key={id}>
        <Task
          onEditing={onEditing}
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
