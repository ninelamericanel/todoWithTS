import {ClearCompleteFunc} from "@componentTypes/app";
import {FilterBtns} from "@componentTypes/todos";
import TaskFilter from "components/taskFilter";
import React from "react";
import './style.css';

type FooterProps = {
    btns: FilterBtns[]
    clearComplete: ClearCompleteFunc
    onSelectedFilter: OnSelectedFilterFunc
    onFilterTodos: OnFilterTodosFunc
}

export const Footer: React.FC<FooterProps> = ({clearComplete, btns}) => {

    let btnsArray = btns.map(item => {
        let {name, selected} = item
        return (
            <li key={name}>
                <TaskFilter name={name} selected={selected}/>
            </li>
        )
    })

    return (<footer className="footer">
        <span className="todo-count">1 items left</span>
        <ul className="filters">
            {btnsArray}
        </ul>
        <button className="clear-completed"
                onClick={() => clearComplete()}>
            Clear completed
        </button>
    </footer>)
}