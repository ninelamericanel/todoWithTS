import React, { useState, useRef, useEffect, useContext } from 'react';

import { PropsContext } from 'context/props-context';
import { HandleChangeInputFunc, HandleKeyUpInputFunc, NoParamsVoidFunc } from 'types/todos';

interface EditInputProps {
  description: string;
  id: string;
  reset: NoParamsVoidFunc;
}

const EditInput: React.FC<EditInputProps> = ({ description, id, reset }) => {
  const [value, setValue] = useState(description);
  const { editingTaskFunc } = useContext(PropsContext);
  const inputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const handleChangeEditInput: HandleChangeInputFunc = (event) => {
    const { target } = event;
    const eventValue = (target as HTMLButtonElement).value;
    setValue(eventValue);
  };

  const handleKeyUpEditInput: HandleKeyUpInputFunc = (event) => {
    if (event.key === 'Enter') {
      if (value === description) {
        reset();
      } else {
        editingTaskFunc(value, id);
      }
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
