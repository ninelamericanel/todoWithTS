import React from 'react';

import './TaskList.scss';
import { Todo } from 'types/todos';
import { Task } from 'components/Task';

interface Props {
  todos: Todo[];
}

const TaskList: React.FC<Props> = ({ todos }) => {
  const todosNodes = todos.map((todo: Todo) => <Task key={todo.id} todo={todo} />);
  return <ul className="todo-list">{todosNodes}</ul>;
};

export default TaskList;
