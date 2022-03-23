import React from "react";
import './style.css';

type TodoProp = {
    created: Date,
    description: string,
    completed: boolean
}

export const Task = ({created, description, completed}: TodoProp) => {
    return (
        <div className="view">
            <input className="toggle" type="checkbox" defaultChecked={completed}></input>
            <label>
                <span className="description">{description}</span>
                <span className="created"></span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
        // <input type="text" className="edit" value={description}></input>
    )
}