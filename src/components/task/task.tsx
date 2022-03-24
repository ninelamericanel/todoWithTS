import React from "react";
import './style.css';
import {format, formatDistanceToNow} from 'date-fns';
import {OnDeletedFunc, OnCompletedFunc} from "@componentTypes/app";

type TodoProp = {
    id: string
    created: Date
    description: string
    completed: boolean
    onDeleted: OnDeletedFunc
    onCompleted: OnCompletedFunc
}

export const Task: React.FC<TodoProp> = ({created, description, completed, onDeleted, id, onCompleted}) => {

    let date = formatDistanceToNow(
        new Date(created),
        {includeSeconds: true}
    )

    return (
        <div className="view">
            <input className="toggle" type="checkbox" checked={completed}></input>
            <label>
                <span className="description"
                      onClick={() => onCompleted(id)}>{description}</span>
                <span className="created">created {date} ago</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"
                    onClick={() => onDeleted(id)}></button>
        </div>
        // <input type="text" className="edit" value={description}></input>
    )
}