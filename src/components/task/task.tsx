import React from "react";
import './style.css';

type TodoProp = {
    todo: {
        created: Date,
        description: string
    }
}

export const Task = ({todo}: TodoProp) => {
    console.log(typeof todo);
    let {description} = todo;
    return (
        <div className="view">
            <input className="toggle" type="checkbox"></input>
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