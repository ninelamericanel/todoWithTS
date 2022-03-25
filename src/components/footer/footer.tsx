import {ClearCompleteFunc, OnFilterTodosFunc, OnSelectedFilterFunc} from "@componentTypes/app";
import {FilterBtns, TodoItem} from "@componentTypes/todos";
import TaskFilter from "components/taskFilter";
import React from "react";
import './style.css';

type FooterProps = {
    todos: TodoItem[]
    btns: FilterBtns[]
    clearComplete: ClearCompleteFunc
    onSelectedFilter: OnSelectedFilterFunc
    onFilterTodos: OnFilterTodosFunc
}

export const Footer: React.FC<FooterProps> = ({todos, clearComplete, btns, onSelectedFilter, onFilterTodos}) => {

    let btnsArray = btns.map(item => {
        let {name, selected} = item
        return (
            <li key={name}>
                <TaskFilter name={name} selected={selected} onFilterTodos={onFilterTodos} onSelectedFilter={onSelectedFilter}/>
            </li>
        )
    })

    let countLeft = todos.filter(item => item.completed).length;

    return (<footer className="footer">
        <span className="todo-count">{countLeft} items left</span>
        <ul className="filters">
            {btnsArray}
        </ul>
        <button className="clear-completed"
                onClick={() => clearComplete()}>
            Clear completed
        </button>
    </footer>)
}