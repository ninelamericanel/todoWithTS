import React from "react";
import './style.css';
import {OnCompletedFunc, onDeletedFunc} from "@componentTypes/app";
import {TodoItem} from "@componentTypes/todos";
import Task from "components/task";

type TodosProp = {
    todos: TodoItem[],
    onCompleted: OnCompletedFunc,
    onDeleted: onDeletedFunc
}

export const TaskList: React.FC<TodosProp> = ({todos, onCompleted, onDeleted}) => {

    let todosNodes = todos.map(item => {
        let {id, completed, editing, created, description} = item;
        let completedClass = completed ? 'completed' : null;
        let editingClass = editing ? 'editing' : null;
        return (
            <li className={completedClass || editingClass || undefined}
                key={id}>
                <Task created={created}
                      description={description}
                      completed={completed}
                      onDeleted={onDeleted}
                      onCompleted={onCompleted}
                      id={id}/>
            </li>
        )
    })

    return (
        <section className="main">
            <ul className="todo-list">{todosNodes}</ul>
        </section>
    )
}
