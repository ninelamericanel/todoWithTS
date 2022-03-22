import React from "react";
import './style.css';
import {TodoItem} from "../todos";
import Footer from "../footer";
import NewTaskForm from "../newTaskForm";
import TaskList from "../taskList";

export const App: React.FC = () => {
    const todos: Array<TodoItem> = [
        {id: 1, completed: true, created: new Date('December 17, 2021'), description: 'Completed task', editing: false},
        {id: 2, completed: false, created: new Date('December 23, 2022'), description: 'Editing task', editing: true},
        {id: 3, completed: false, created: new Date('December 25, 2022'), description: 'Active task', editing: false}]

    console.log(todos);

    return (
        <section className="todoapp">
            <NewTaskForm/>
            <TaskList todos={todos}/>
            <Footer/>
        </section>)
}