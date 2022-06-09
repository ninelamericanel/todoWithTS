import React, { FC, useEffect, useState } from 'react';
import './App.scss';

import { NewTaskForm } from 'components/NewTaskForm';
import {
  Todo,
  OnAddTodoFunc,
  OnDeletedFunc,
  CreateNewTaskFunc,
  EditingTaskFunc,
  NoParamsVoidFunc,
  OnFilterTodosFunc,
  OnChangeTimerFunc,
  DisplayTodoFunc,
  HandleClickFilterButtonFunc,
  HandleKeyUpFormFunc,
  FormType,
  HandleChangeInputFunc,
  OnCompletedFunc,
} from 'types/todos';
import { PropsContext } from 'context/props-context';
import { TaskList } from 'components/TaskList';
import { Filter } from 'components/Filter';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [form, setForm] = useState<FormType>({ title: '', min: '', sec: '' });
  const [button, setButton] = useState('All');

  const countTodos = todos.length;

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

  const onFilterTodos: OnFilterTodosFunc = (name = button) => {
    const allTodods = todos.map((item) => {
      if (name === 'Active') {
        item.display = !item.completed;
      } else if (name === 'Completed') {
        item.display = item.completed;
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
      id: Date.now().toString(),
      created: new Date(),
      description,
      initialSec: +min * 60 + +sec,
      completed: false,
      display: displayTodo(),
    };
  };

  const resetForm: NoParamsVoidFunc = () => setForm({ title: '', min: '', sec: '' });

  const onAddTodo: OnAddTodoFunc = (description, min, sec) => {
    const newTodo = createNewTask(description, min, sec);
    setTodos([...todos, newTodo]);
  };

  const handleEnterForm: HandleKeyUpFormFunc = (event) => {
    const { title, min, sec } = form;
    if (event.key === 'Enter' && title.trim()) {
      onAddTodo(title, min, sec);
      resetForm();
    }
  };

  const handleChangeForm: HandleChangeInputFunc = (event) => {
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

  const onCompleted: OnCompletedFunc = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const clearComplete: NoParamsVoidFunc = () => {
    const newTodos = todos.filter((item) => (!item.completed ? item : null));
    setTodos(newTodos);
  };

  const editingTask: EditingTaskFunc = (value, id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.description = value;
        todo.created = new Date();
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const onChangeTimer: OnChangeTimerFunc = (newSec, id) => {
    const newArray = todos.map((item) => {
      if (item.id === id) {
        item.initialSec = newSec;
      }
      return item;
    });
    setTodos(newArray);
  };
  const handleClickFilterButton: HandleClickFilterButtonFunc = (nameButton) => {
    if (countTodos) {
      setButton(nameButton);
      onFilterTodos(nameButton);
    }
  };
  const countLeft = todos.filter((item) => item.completed).length;

  return (
    <PropsContext.Provider
      value={{
        onChangeTimerFunc: onChangeTimer,
        onCompletedFunc: onCompleted,
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
          <form className="new-todo-form" onKeyUp={handleEnterForm}>
            <NewTaskForm form={form} handleChange={handleChangeForm} />
          </form>
        </header>
        <section className="main">
          <TaskList todos={todos} />
        </section>
        <footer className="footer">
          <span className="todo-count">{countLeft} items left</span>
          <ul className="filters">
            <Filter button={button} handleClick={handleClickFilterButton} />
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
