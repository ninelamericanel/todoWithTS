import React, { FC } from 'react';

import './TaskList.scss';
import {
  EditingTaskFunc,
  OnChangeTimerFunc,
  OnCompletedFunc,
  OnDeletedFunc,
  OnFilterTodosFunc,
  Todo,
} from 'types/todos';
import { Task } from 'components/Task';

interface Props {
  todos: Todo[];
  editingTask: EditingTaskFunc;
  onChangeTimer: OnChangeTimerFunc;
  onCompleted: OnCompletedFunc;
  onFilterTodos: OnFilterTodosFunc;
  onDeleted: OnDeletedFunc;
}

const TaskList: FC<Props> = ({ editingTask, onChangeTimer, onCompleted, onFilterTodos, onDeleted, todos }) => {
  const nodes = todos.map((todo: Todo) => {
    return (
      <Task
        editingTask={editingTask}
        onChangeTimer={onChangeTimer}
        onCompleted={onCompleted}
        onFilterTodos={onFilterTodos}
        onDeleted={onDeleted}
        key={todo.id}
        todo={todo}
      />
    );
  });
  return <ul className="todo-list">{nodes}</ul>;
};

export default TaskList;
