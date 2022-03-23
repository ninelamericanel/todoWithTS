import React, {Component} from "react";
import './style.css';
import {TodoItem} from "../todos";
import Footer from "../footer";
import NewTaskForm from "../newTaskForm";
import TaskList from "../taskList";

type TodosState = {
    todos: Array<TodoItem>
}

type TodosProps = {}

export default class App extends Component<TodosProps, TodosState> {
    state = {
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

    onCompleted = (id: string) => {
        let newTodos = this.state.todos.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
            return item;
        });

        return this.setState({
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