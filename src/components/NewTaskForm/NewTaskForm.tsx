import React from 'react';
import './NewTaskForm.scss';

import { OnAddFunc } from 'types/app';

interface NewTaskFormProps {
  onAdd: OnAddFunc;
}

type HandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => void;

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAdd }) => {
  const handleKeyDown: HandleKeyDown = (event) => {
    const { target } = event;
    const value = (target as HTMLButtonElement).value;
    if (event.key === 'Enter' && value.trim()) {
      onAdd(value);
      (target as HTMLButtonElement).value = '';
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input className="new-todo" onKeyUp={handleKeyDown} placeholder="What needs to be done?" autoFocus></input>
        <input className="new-todo-form__timer" placeholder="Min" autoFocus></input>
        <input className="new-todo-form__timer" placeholder="Sec" autoFocus></input>
      </form>
    </header>
  );
};

export default NewTaskForm;
