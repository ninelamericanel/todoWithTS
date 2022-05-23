import React, { useState, useRef, useEffect, useContext } from 'react';

import { PropsContext } from 'context/props-context';
import { HandleChangeFunc, HandleKeyUpInputFunc } from 'types/todos';

interface EditInputProps {
  description: string;
  id: string;
}

const EditInput: React.FC<EditInputProps> = ({ description, id }) => {
  const [value, setValue] = useState(description);
  const { editingTaskFunc, onChangeStatusFunc } = useContext(PropsContext);
  const inputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const handleChange: HandleChangeFunc = (event) => {
    const { target } = event;
    const eventValue = (target as HTMLButtonElement).value;
    setValue(eventValue);
  };

  const handleKeyUp: HandleKeyUpInputFunc = (event) => {
    if (event.key === 'Enter') {
      if (value === description) {
        onChangeStatusFunc(id, 'editing');
      } else {
        editingTaskFunc(value, id);
      }
    }
    if (event.key === 'Escape') onChangeStatusFunc(id, 'editing');
  };

  return (
    <input
      type="text"
      ref={inputElement}
      className="edit"
      value={value}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      autoFocus
    ></input>
  );
};

export default EditInput;
