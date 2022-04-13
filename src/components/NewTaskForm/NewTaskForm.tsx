import React, { useState } from 'react';
import './NewTaskForm.scss';

import { OnAddFunc } from 'types/app';

interface NewTaskFormProps {
  onAdd: OnAddFunc;
}

type HandleKeyUpFunc = (event: React.KeyboardEvent<HTMLFormElement>) => void;
type HandleChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => void;
type ResetFormFunc = () => void;

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const resetForm: ResetFormFunc = () => {
    setName('');
    setMin('');
    setSec('');
  };
  const handleKeyUp: HandleKeyUpFunc = (event) => {
    if (event.key === 'Enter' && name.trim()) {
      onAdd(name, min, sec);
      resetForm();
    }
  };
  const handleChange: HandleChangeFunc = (event) => {
    const { target } = event;
    if (target?.dataset.action === 'task-name') setName(target.value);
    if (target?.dataset.action === 'task-min' && (+target.value || target.value === '') && +target.value <= 59)
      setMin(target.value);
    if (target?.dataset.action === 'task-sec' && (+target.value || target.value === '') && +target.value <= 59)
      setSec(target.value);
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onKeyUp={handleKeyUp}>
        <input
          onChange={handleChange}
          data-action="task-name"
          value={name}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        ></input>
        <input
          onChange={handleChange}
          data-action="task-min"
          value={min}
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
        ></input>
        <input
          onChange={handleChange}
          data-action="task-sec"
          value={sec}
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
        ></input>
      </form>
    </header>
  );
};

export default NewTaskForm;
