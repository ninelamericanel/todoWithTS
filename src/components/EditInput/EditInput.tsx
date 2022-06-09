import React, { useState, useRef, useEffect } from 'react';

import { HandleChangeInputFunc, HandleKeyUpInputFunc, NoParamsVoidFunc } from 'types/todos';

interface EditInputProps {
  description: string;
  reset: NoParamsVoidFunc;
  handleEditTask: (value: string) => void;
}

const EditInput: React.FC<EditInputProps> = ({ description, reset, handleEditTask }) => {
  const [value, setValue] = useState(description);
  const inputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const handleChangeEditInput: HandleChangeInputFunc = (event) => {
    const eventValue = (event.target as HTMLButtonElement).value;
    setValue(eventValue);
  };

  const handleKeyUpEditInput: HandleKeyUpInputFunc = (event) => {
    if (event.key === 'Enter') {
      if (value === description) reset();
      handleEditTask(value);
    }
    if (event.key === 'Escape') reset();
  };

  return (
    <input
      type="text"
      ref={inputElement}
      className="edit"
      value={value}
      onChange={handleChangeEditInput}
      onKeyUp={handleKeyUpEditInput}
      autoFocus
    />
  );
};

export default EditInput;
