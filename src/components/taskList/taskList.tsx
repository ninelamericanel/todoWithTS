import React from "react";
import './style.css';
import Task from "../task";
import {TodoItem} from "../todos";

type TodosProp = {
    todos: Array<TodoItem>
}

export const TaskList = ({todos}: TodosProp) => {
    let todosNodes = todos.map(item => {
        let {id, ...other} = item;
        // console.log(item.completed, item.editing);
        // let completedClass = item.completed ? 'completed' : null;
        // let editingClass = item.editing ? 'editing' : null;
        return (
            <li key={id}>
                <Task todo={other}/>
            </li>
        )
    })

    return (
        <section className="main">
            <ul className="todo-list">{todosNodes}</ul>
        </section>
    )
}
