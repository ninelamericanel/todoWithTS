import React, {Component} from "react";
import './style.css';

import {OnCompletedFunc} from "@componentTypes/app";
import {TodoItem} from "@componentTypes/todos";
import Footer from "components/footer";
import NewTaskForm from "components/newTaskForm";
import TaskList from "components/taskList";

type AppState = {
    todos: TodoItem[]
}

type TodosProps = {}

export default class App extends Component<TodosProps, AppState> {
    state: AppState = {
        todos: [
            {
                id: "1",
                completed: true,
                created: new Date('December 17, 2021'),
                description: 'Completed task',
                editing: false
            },
            {
                id: "2",
                completed: false,
                created: new Date('December 23, 2022'),
                description: 'Editing task',
                editing: true
            },
            {
                id: "3",
                completed: false,
                created: new Date('December 25, 2022'),
                description: 'Active task',
                editing: false
            }
        ]
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

    render() {
        return (
            <section className="todoapp">
                <NewTaskForm/>
                <section className="main">
                    <TaskList todos={this.state.todos}
                              onCompleted={this.onCompleted}/>
                </section>
                <Footer/>
            </section>)
    }

}