import React, {Component} from "react";
import './style.css';

import {
    OnCompletedFunc,
    OnDeletedFunc,
    OnAddFunc,
    ClearCompleteFunc,
    OnSelectedFilterFunc,
    OnFilterTodosFunc,
    FindMaxIdFunc
} from "@componentTypes/app";
import {TodoItem, FilterBtns} from "@componentTypes/todos";
import Footer from "components/footer";
import NewTaskForm from "components/newTaskForm";
import TaskList from "components/taskList";

type CreateTaskFunc = (text: string) => TodoItem

type AppState = {
    todos: TodoItem[],
    filterBtns: FilterBtns[]
}

type TodosProps = {}

export default class App extends Component<TodosProps, AppState> {
    state: AppState = {
        todos: [
            {
                id: "1",
                completed: true,
                created: new Date('Febrary 12, 2022'),
                description: 'Completed task',
                editing: false,
                display: true
            },
            {
                id: "2",
                completed: false,
                created: new Date('March 24, 2022'),
                description: 'Editing task',
                editing: false,
                display: true
            },
            {
                id: "3",
                completed: false,
                created: new Date('March 21, 2022'),
                description: 'Active task',
                editing: false,
                display: true
            }
        ],
        filterBtns: [
            {name: 'All', selected: true},
            {name: 'Active', selected: false},
            {name: 'Completed', selected: false}
        ]
    }

    createTask: CreateTaskFunc = (text) => {
        return {
            id: this.findMaxId(),
            completed: false,
            created: new Date(),
            description: text,
            editing: false,
            display: true
        }
    }

    findMaxId: FindMaxIdFunc = () => {
        let ids = this.state.todos.map(item => +item.id);
        return ids.length > 0 ? (Math.max(...ids) + 1).toString() : '1';
    }

    onAdd: OnAddFunc = (text) => {
        let newTodos = this.state.todos;
        newTodos.push(this.createTask(text));
        this.setState({
            todos: newTodos
        })
    }

    onCompleted: OnCompletedFunc = (id) => {
        let newTodos = this.state.todos.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
            return item;
        });
        this.setState({
            todos: newTodos
        })
    }

    clearComplete: ClearCompleteFunc = () => {
        let newTodos = this.state.todos.filter((item) => {
            return item.completed ? null : item;
        });
        this.setState({
            todos: newTodos
        })
    }

    onDeleted: OnDeletedFunc = (id) => {
        let newTodos = this.state.todos.filter((item) => {
            return item.id !== id ? item : null;
        });
        this.setState({
            todos: newTodos
        })
    }

    onSelectedFilter: OnSelectedFilterFunc = (name) => {
        let newBtns = this.state.filterBtns.map(btn => {
            btn.name === name ? btn.selected = true : btn.selected = false;
            return btn;
        })
        this.setState({
            filterBtns: newBtns
        })
    }

    onFilterTodos: OnFilterTodosFunc = (name) => {
        let allTodods = this.state.todos.map(item => {
            if (name === 'Active') {
                item.completed ? item.display = false : item.display = true;
            } else if (name === 'Completed') {
                item.completed ? item.display = true : item.display = false;
            } else {
                item.display = true;
            }
            return item;
        })

        this.setState({
            todos: allTodods
        })

    }

    render() {
        return (
            <section className="todoapp">
                <NewTaskForm onAdd={this.onAdd}/>
                <section className="main">
                    <TaskList todos={this.state.todos}
                              onCompleted={this.onCompleted}
                              onDeleted={this.onDeleted}/>
                </section>
                <Footer
                    todos={this.state.todos}
                    btns={this.state.filterBtns}
                    clearComplete={this.clearComplete}
                    onSelectedFilter={this.onSelectedFilter}
                    onFilterTodos={this.onFilterTodos}/>
            </section>)
    }

}