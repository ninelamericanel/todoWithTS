import React from 'react';

import './TaskList.scss';
import {
  EditingTaskFunc,
  OnChangeTimerFunc,
  OnCompletedFunc,
  OnDeletedFunc,
  OnEditingFunc,
  TimerFormatFunc,
} from 'types/app';
import { TodoItem } from 'types/todos';
import { Task } from 'components/Task';

interface TodosProp {
  todos: TodoItem[];
  onCompleted: OnCompletedFunc;
  onDeleted: OnDeletedFunc;
  onEditing: OnEditingFunc;
  editingTask: EditingTaskFunc;
  timerFormat: TimerFormatFunc;
  onChangeTimer: OnChangeTimerFunc;
}

const TaskList: React.FC<TodosProp> = ({
  onChangeTimer,
  todos,
  onCompleted,
  onDeleted,
  onEditing,
  editingTask,
  timerFormat,
}) => {
  const todosNodes = todos.map((item) => {
    const { id, created, description, status, display, timer } = item;
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
          editingTask={editingTask}
          id={id}
          timer={timer}
          timerFormat={timerFormat}
          onChangeTimer={onChangeTimer}
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
