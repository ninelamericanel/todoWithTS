import React, { FC, useEffect, useState } from 'react';
import './App.scss';

import { NewTaskForm } from 'components/NewTaskForm';
import {
  Todo,
  OnAddTodoFunc,
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
  MapperFunc,
  OnDeletedFunc,
  FilterFunc,
} from 'types/todos';
import { Filter } from 'components/Filter';
import { Task } from 'components/Task';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState<FormType>({ title: '', min: '', sec: '' });
  const [button, setButton] = useState('All');

  const countTodos = todos.length;

  useEffect(() => {
    const todosFromLS = JSON.parse(localStorage.todos).length ? localStorage.todos : JSON.stringify([...todos]);
    localStorage.setItem('todos', todosFromLS);
    setTodos(JSON.parse(todosFromLS));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (countTodos === 0) setButton('All');
  }, [countTodos]);

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
  const mapper: MapperFunc = (callback) => setTodos(todos.map(callback));
  const onChangeTimer: OnChangeTimerFunc = (id, newSec) => {
    mapper((todo: Todo) => {
      if (todo.id === id) todo.initialSec = newSec;
      return todo;
    });
  };
  const onCompleted: OnCompletedFunc = (id) => {
    mapper((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
  };
  const editingTask: EditingTaskFunc = (id, value) => {
    mapper((todo) => {
      if (todo.id === id) {
        todo.description = value;
        todo.created = new Date();
      }
      return todo;
    });
  };
  const onFilterTodos: OnFilterTodosFunc = (name = button) => {
    mapper((item) => {
      if (name === 'Active') {
        item.display = !item.completed;
      } else if (name === 'Completed') {
        item.display = item.completed;
      } else {
        item.display = true;
      }
      return item;
    });
  };
  const filter: FilterFunc = (callback) => setTodos(todos.filter(callback));
  const onDeleted: OnDeletedFunc = (id) => filter((todo) => todo.id !== id);
  const clearComplete = () => filter((todo) => !todo.completed);
  const countLeft = todos.filter((item) => item.completed).length;
  const handleEnterForm: HandleKeyUpFormFunc = (event) => {
    const { title, min, sec } = form;
    if (event.key === 'Enter' && title.trim()) {
      onAddTodo(title, min, sec);
      resetForm();
    }
  };
  const handleChangeForm: HandleChangeInputFunc = (event) => {
    const { target } = event;
    const { value, dataset } = target;
    const maxValue = +value <= 59;
    if (dataset.action === 'task-name') setForm({ ...form, title: value });
    if (dataset.action === 'task-min' && maxValue) setForm({ ...form, min: value });
    if (dataset.action === 'task-sec' && maxValue) setForm({ ...form, sec: value });
  };
  const handleClickFilterButton: HandleClickFilterButtonFunc = (nameButton) => {
    if (countTodos) {
      setButton(nameButton);
      onFilterTodos(nameButton);
    }
  };

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
