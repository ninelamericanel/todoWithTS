import React, { useState, useRef, useEffect } from 'react';

import { EditingTaskFunc } from 'types/app';

interface EditInputProps {
  editingTask: EditingTaskFunc;
  description: string;
  id: string;
}

type HandleChange = (event: React.ChangeEvent) => void;
type HandleClick = (event: React.KeyboardEvent) => void;

const EditInput: React.FC<EditInputProps> = ({ description, editingTask, id }) => {
  const [value, setValue] = useState(description);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const handleChange: HandleChange = (event) => {
    const { target } = event;
    const eventValue = (target as HTMLButtonElement).value;
    setValue(eventValue);
  };

  const handleClick: HandleClick = (event) => (event.key === 'Enter' ? editingTask(value, id) : null);

  return (
    <input
      type="text"
      ref={inputElement}
      className="edit"
      value={value}
      onChange={handleChange}
      onKeyUp={handleClick}
      autoFocus
    ></input>
  );
};

export default EditInput;
