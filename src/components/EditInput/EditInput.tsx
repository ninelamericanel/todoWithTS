import React, { useState, useRef, useEffect, useContext } from 'react';

import { PropsContext } from 'context/props-context';

interface EditInputProps {
  description: string;
  id: string;
}

const EditInput: React.FC<EditInputProps> = ({ description, id }) => {
  const [value, setValue] = useState(description);
  const context = useContext(PropsContext);
  const inputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const handleChange = (event: React.ChangeEvent): void => {
    const { target } = event;
    const eventValue = (target as HTMLButtonElement).value;
    setValue(eventValue);
  };

  const handleClick = (event: React.KeyboardEvent): void | null =>
    event.key === 'Enter' ? context.editingTaskFunc(value, id) : null;

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
