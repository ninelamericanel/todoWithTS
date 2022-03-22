import React from "react";
import './style.css';

export const NewTaskForm: React.FC = () => {
    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus></input>
        </header>
    )
}