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
  OnChangeStatusFunc,
  NoParamsVoidFunc,
  OnFilterTodosFunc,
  OnChangeTimerFunc,
  DisplayTodoFunc,
  HandleClickFunc,
  HandleKeyUpFunc,
  FormType,
  HandleChangeFunc,
} from 'types/todos';
import { PropsContext } from 'context/props-context';
import { TaskList } from 'components/TaskList';
import { Filter } from 'components/Filter';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [form, setForm] = useState<FormType>({ title: '', min: '', sec: '' });
  const [button, setButton] = useState('All');

  const countTodos = todos.length;

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

  useEffect(() => {
    if (countTodos === 0) setButton('All');
  }, [countTodos]);

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
      initialMin: timerFormat(+min),
      initialSec: timerFormat(+sec),
      status: 'active',
      display: displayTodo(),
    };
  };

  const resetForm: NoParamsVoidFunc = () => setForm({ title: '', min: '', sec: '' });

  const onAddTodo: OnAddTodoFunc = (description, min, sec) => {
    const newTodo = createNewTask(description, min, sec);
    setTodos([...todos, newTodo]);
  };

  const handleKeyUp: HandleKeyUpFunc = (event) => {
    const { title, min, sec } = form;
    if (event.key === 'Enter' && title.trim()) {
      onAddTodo(title, min, sec);
      resetForm();
    }
  };

  const handleChange: HandleChangeFunc = (event) => {
    const { target } = event;
    if (target?.dataset.action === 'task-name') setForm({ ...form, title: target.value });
    if (target?.dataset.action === 'task-min' && (+target.value || target.value === '') && +target.value <= 59)
      setForm({ ...form, min: target.value });
    if (target?.dataset.action === 'task-sec' && (+target.value || target.value === '') && +target.value <= 59)
      setForm({ ...form, sec: target.value });
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
        item.initialMin = newMin;
        item.initialSec = newSec;
      }
      return item;
    });
    setTodos(newArray);
  };
  const handleClick: HandleClickFunc = (nameButton) => {
    if (countTodos) {
      setButton(nameButton);
      onFilterTodos(nameButton);
    }
  };
  const countLeft = todos.filter((item) => item.status === 'completed').length;

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
        onAddTodoFunc: onAddTodo,
      }}
    >
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form className="new-todo-form" onKeyUp={handleKeyUp}>
            <NewTaskForm form={form} handleChange={handleChange} />
          </form>
        </header>
        <section className="main">
          <TaskList todos={todos} />
        </section>
        <footer className="footer">
          <span className="todo-count">{countLeft} items left</span>
          <ul className="filters">
            <Filter button={button} handleClick={handleClick} />
          </ul>
          <button className="clear-completed" onClick={clearComplete}>
            Clear completed
          </button>
        </footer>
      </section>
    </PropsContext.Provider>
  );
};

export default App;
