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
      <input className="new-todo" onKeyUp={handleKeyDown} placeholder="What needs to be done?" autoFocus></input>
    </header>
  );
};

export default NewTaskForm;
