import React from "react";
import './style.css';

type TaskFilterProps = {
    name: string
    selected: boolean
}

export const TaskFilter: React.FC<TaskFilterProps> = ({name, selected}) => {
    let classSelected = selected ? 'selected' : null;

    return (
        <button className={classSelected || undefined}>{name}</button>)
}