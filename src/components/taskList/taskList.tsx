import React from "react";
import './style.css';
import Task from "../task";
import {TodoItem} from "../todos";

type TodosProp = {
    todos: Array<TodoItem>
}

export const TaskList = ({todos}: TodosProp) => {
    let todosNodes = todos.map(item => {
        let {id, completed, editing,  created, description} = item;
        let completedClass = completed ? 'completed' : null;
        let editingClass = editing ? 'editing' : null;
        return (
            <li className={completedClass || editingClass || undefined} key={id}>
                <Task created={created} description={description}/>
            </li>
        )
    })

    return (
        <section className="main">
            <ul className="todo-list">{todosNodes}</ul>
        </section>
    )
}
