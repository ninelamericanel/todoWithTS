import React, { Component } from 'react';
import './App.scss';

import { Footer } from 'components/Footer';
import { NewTaskForm } from 'components/NewTaskForm';
import { TaskList } from 'components/TaskList';
import { TodoItem, FilterButtons } from 'types/todos';
import {
  OnCompletedFunc,
  OnDeletedFunc,
  OnAddFunc,
  ClearCompleteFunc,
  OnSelectedFilterFunc,
  OnFilterTodosFunc,
  FindMaxIdFunc,
} from 'types/app';

type CreateTaskFunc = (text: string) => TodoItem;

type AppState = {
  todos: TodoItem[];
  filterButtons: FilterButtons[];
};

type TodosProps = {};

export default class App extends Component<TodosProps, AppState> {
  state: AppState = {
    todos: [
      {
        id: '1',
        completed: true,
        created: new Date('Febrary 12, 2022'),
        description: 'Completed task',
        editing: false,
        display: true,
      },
      {
        id: '2',
        completed: false,
        created: new Date('March 24, 2022'),
        description: 'Editing task',
        editing: false,
        display: true,
      },
      {
        id: '3',
        completed: false,
        created: new Date('March 21, 2022'),
        description: 'Active task',
        editing: false,
        display: true,
      },
    ],
    filterButtons: [
      { name: 'All', selected: true },
      { name: 'Active', selected: false },
      { name: 'Completed', selected: false },
    ],
  };

  createTask: CreateTaskFunc = (text) => {
    return {
      id: this.findMaxId(),
      completed: false,
      created: new Date(),
      description: text,
      editing: false,
      display: true,
    };
  };

  findMaxId: FindMaxIdFunc = () => {
    const ids = this.state.todos.map((item) => +item.id);
    return ids.length > 0 ? (Math.max(...ids) + 1).toString() : '1';
  };

  onAdd: OnAddFunc = (text) => {
    const newTodos = this.state.todos;
    newTodos.push(this.createTask(text));
    this.setState({
      todos: newTodos,
    });
  };

  onCompleted: OnCompletedFunc = (id) => {
    const newTodos = this.state.todos.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.setState({
      todos: newTodos,
    });
  };

  clearComplete: ClearCompleteFunc = () => {
    const newTodos = this.state.todos.filter((item) => (!item.completed ? item : null));
    this.setState({
      todos: newTodos,
    });
  };

  onDeleted: OnDeletedFunc = (id) => {
    const newTodos = this.state.todos.filter((item) => (item.id !== id ? item : null));
    this.setState({
      todos: newTodos,
    });
  };

  onSelectedFilter: OnSelectedFilterFunc = (name) => {
    const newButtons = this.state.filterButtons.map((btn) => {
      btn.selected = btn.name === name;
      return btn;
    });
    this.setState({
      filterButtons: newButtons,
    });
  };

  onFilterTodos: OnFilterTodosFunc = (name) => {
    const allTodods = this.state.todos.map((item) => {
      if (name === 'Active') {
        item.display = !item.completed;
      } else if (name === 'Completed') {
        item.display = item.completed;
      } else {
        item.display = true;
      }
      return item;
    });
    this.setState({
      todos: allTodods,
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.onAdd} />
        <section className="main">
          <TaskList todos={this.state.todos} onCompleted={this.onCompleted} onDeleted={this.onDeleted} />
        </section>
        <Footer
          todos={this.state.todos}
          buttons={this.state.filterButtons}
          clearComplete={this.clearComplete}
          onSelectedFilter={this.onSelectedFilter}
          onFilterTodos={this.onFilterTodos}
        />
      </section>
    );
  }
}
