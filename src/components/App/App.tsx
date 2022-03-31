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
  OnEditingFunc,
  EditingTaskFunc,
} from 'types/app';

type CreateTaskFunc = (text: string) => TodoItem;

type AppState = {
  todos: TodoItem[];
  filterButtons: FilterButtons[];
};

interface TodosProps {}

export default class App extends Component<TodosProps, AppState> {
  state: AppState = {
    todos: [
      {
        id: '1',
        created: new Date(),
        description: 'Completed task',
        status: 'completed',
        display: true,
      },
      {
        id: '2',
        created: new Date(),
        description: 'Editing task',
        status: 'active',
        display: true,
      },
      {
        id: '3',
        created: new Date(),
        description: 'Active task',
        status: 'active',
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
      created: new Date(),
      description: text,
      status: 'active',
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
        item.status = item.status === 'active' ? (item.status = 'completed') : (item.status = 'active');
      }
      return item;
    });
    this.setState({
      todos: newTodos,
    });
  };

  clearComplete: ClearCompleteFunc = () => {
    const newTodos = this.state.todos.filter((item) => (item.status === ('active' || 'editing') ? item : null));
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

  onEditing: OnEditingFunc = (id) => {
    const newTodos = this.state.todos.map((item) => {
      if (item.id === id) {
        item.status = 'editing';
      }
      return item;
    });
    this.setState({
      todos: newTodos,
    });
  };

  editingTask: EditingTaskFunc = (value, id) => {
    const newArray = this.state.todos.map((item) => {
      if (item.id === id) {
        item.description = value;
        item.status = 'active';
        item.created = new Date();
      }
      return item;
    });

    this.setState({
      todos: newArray,
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
        item.display = item.status === 'active';
      } else if (name === 'Completed') {
        item.display = item.status === 'completed';
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
          <TaskList
            todos={this.state.todos}
            onEditing={this.onEditing}
            onCompleted={this.onCompleted}
            onDeleted={this.onDeleted}
            editingTask={this.editingTask}
          />
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
