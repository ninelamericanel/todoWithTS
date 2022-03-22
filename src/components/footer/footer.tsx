import React from "react";
import './style.css';

export const Footer:React.FC = () => {
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
        <button className="clear-completed">Clear completed</button>
    </footer>)
}