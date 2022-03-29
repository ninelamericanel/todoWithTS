import React from 'react';
import './style.css';

import { OnAddFunc } from 'componentTypes/app';

type NewTaskFormProps = {
  onAdd: OnAddFunc;
};

type HandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => void;

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAdd }) => {
  const handleKeyDown: HandleKeyDown = (event) => {
    const { target } = event;
    if (event.key === 'Enter') {
      onAdd((target as HTMLButtonElement).value);
      (target as HTMLButtonElement).value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" onKeyUp={handleKeyDown} placeholder="What needs to be done?" autoFocus></input>
    </header>
  );
};