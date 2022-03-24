import {ClearCompleteFunc} from "@componentTypes/app";
import React from "react";
import './style.css';

type FooterProps = {
    clearComplete: ClearCompleteFunc
}

export const Footer: React.FC<FooterProps> = ({clearComplete}) => {
    return (<footer className="footer">
        <span className="todo-count">1 items left</span>
        <ul className="filters">
            <li>
                <button className="selected">All</button>
            </li>
            <li>
                <button>Active</button>
            </li>
            <li>
                <button>Completed</button>
            </li>
        </ul>
        <button className="clear-completed"
                onClick={() => clearComplete()}>
            Clear completed
        </button>
    </footer>)
}