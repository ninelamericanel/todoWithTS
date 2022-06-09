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
import { Filter } from 'components/Filter';
import { Task } from 'components/Task';

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

  const onAddTodo: OnAddTodoFunc = (description, min, sec) =>
    setTodos([...todos, createNewTask(description, min, sec)]);

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

  const onDeleted: OnDeletedFunc = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const onCompleted: OnCompletedFunc = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const clearComplete: NoParamsVoidFunc = () => setTodos(todos.filter((item) => (!item.completed ? item : null)));

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
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onKeyUp={handleEnterForm}>
          <NewTaskForm handleChangeForm={handleChangeForm} form={form} />
        </form>
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map((todo) => {
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
          })}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">{countLeft} items left</span>
        <ul className="filters">
          <Filter handleClickFilterButton={handleClickFilterButton} button={button} />
        </ul>
        <button className="clear-completed" onClick={clearComplete}>
          Clear completed
        </button>
      </footer>
    </section>
  );
};

export default App;
