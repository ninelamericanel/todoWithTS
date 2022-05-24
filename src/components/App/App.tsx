import React, { FC, useEffect, useState } from 'react';
import './App.scss';

import { NewTaskForm } from 'components/NewTaskForm';
import {
  Todo,
  OnAddTodoFunc,
  OnDeletedFunc,
  FindMaxIdFunc,
  CreateNewTaskFunc,
  EditingTaskFunc,
  TimerFormatFunc,
  OnChangeTimerFunc,
  OnChangeStatusFunc,
  NoParamsVoidFunc,
  OnFilterTodosFunc,
  OnChangeTimerFunc,
  DisplayTodoFunc,
} from 'types/todos';
import { PropsContext } from 'context/props-context';
import { TaskList } from 'components/TaskList';
import { Footer } from 'components/Footer';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const findMaxId: FindMaxIdFunc = () => {
    const ids = todos.map((item) => +item.id);
    return ids.length > 0 ? (Math.max(...ids) + 1).toString() : '1';
  };

  useEffect(() => {
    const todosFromLS = JSON.parse(localStorage.todos).length ? localStorage.todos : JSON.stringify([...todos]);
    localStorage.setItem('todos', todosFromLS);
    setTodos(JSON.parse(localStorage.todos));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const timerFormat: TimerFormatFunc = (num) => (num < 10 ? '0' + num : num.toString());

  const onFilterTodos: OnFilterTodosFunc = (name = button) => {
    const allTodods = todos.map((item) => {
      if (name === 'Active') {
        item.display = item.status === 'active';
      } else if (name === 'Completed') {
        item.display = item.status === 'completed';
      } else {
        item.display = true;
      }
      return item;
    });
    setTodos(allTodods);
  };

  const displayTodo: DisplayTodoFunc = () => button !== 'Completed';

  const createNewTask: CreateNewTaskFunc = (description, min, sec) => {
    return {
      id: findMaxId(),
      created: new Date(),
      description,
      min: timerFormat(+min),
      sec: timerFormat(+sec),
      status: 'active',
      display: displayTodo(),
    };
  };

  const onAddTodo: OnAddTodoFunc = (description, min, sec): void => {
    const newTodo = createNewTask(description, min, sec);
    setTodos([...todos, newTodo]);
  };

  const onDeleted: OnDeletedFunc = (id) => {
    const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const onChangeStatus: OnChangeStatusFunc = (id, status) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) todo.status = todo.status === 'active' ? (todo.status = status) : (todo.status = 'active');
      return todo;
    });
    setTodos(newTodos);
  };

  const clearComplete: NoParamsVoidFunc = () => {
    const newTodos = todos.filter((item) => (item.status === ('active' || 'editing') ? item : null));
    setTodos(newTodos);
  };

  const onFilterTodos: OnFilterTodosFunc = (name) => {
    const allTodods = todos.map((item) => {
      if (name === 'Active') {
        item.display = item.status === 'active';
      } else if (name === 'Completed') {
        item.display = item.status === 'completed';
      } else {
        item.display = true;
      }
      return item;
    });
    setTodos(allTodods);
  };

  const editingTask: EditingTaskFunc = (value, id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.description = value;
        todo.created = new Date();
        todo.status = 'active';
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const onChangeTimer: OnChangeTimerFunc = (newMin, newSec, id) => {
    const newArray = todos.map((item) => {
      if (item.id === id) {
        item.min = newMin;
        item.sec = newSec;
      }
      return item;
    });
    setTodos(newArray);
  };

  const countLeft = todos.filter((item) => item.status === 'completed').length;
  const countTodods = todos.length;

  return (
    <PropsContext.Provider
      value={{
        onChangeTimerFunc: onChangeTimer,
        timerFormatFunc: timerFormat,
        onChangeStatusFunc: onChangeStatus,
        onDeletedFunc: onDeleted,
        editingTaskFunc: editingTask,
        clearCompleteFunc: clearComplete,
        onFilterTodosFunc: onFilterTodos,
      }}
    >
      <section className="todoapp">
        <NewTaskForm onAddTodo={onAddTodo} />
        <section className="main">
          <TaskList todos={todos} />
        </section>
        <Footer countLeft={countLeft} countTodods={countTodods} />
      </section>
    </PropsContext.Provider>
  );
};

export default App;
