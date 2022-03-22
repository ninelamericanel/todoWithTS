import React from "react";
import './style.css';
import Task from "../task";
import {TodoItem} from "../todos";

type TodosProp = {
    todos: Array<TodoItem>
}

export const TaskList = ({todos}: TodosProp) => {
    console.log(todos);

    return (
        <section className="main">
            <ul className="todo-list"></ul>
            <Task/>
        </section>
    )
}
