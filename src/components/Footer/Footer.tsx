import React, { Dispatch, FC, useContext, useEffect } from 'react';
import './Footer.scss';

import { PropsContext } from 'context/props-context';
import { HandleClickFunc } from 'types/todos';

interface FooterProps {
  countLeft: number;
  countTodods: number;
  setButton: Dispatch<string>;
  button: string;
}

const Footer: FC<FooterProps> = ({ countLeft, countTodods, setButton, button }) => {
  const buttonsNames = ['All', 'Active', 'Completed'];
  const { clearCompleteFunc, onFilterTodosFunc } = useContext(PropsContext);

  useEffect(() => {
    if (countTodods === 0) setButton('All');
  }, [countTodods]);

  const handleClick: HandleClickFunc = (nameButton) => {
    if (countTodods) {
      setButton(nameButton);
      onFilterTodosFunc(nameButton);
    }
  };

  const buttonsNodes = buttonsNames.map((name, i) => {
    const classSelected = name === button ? 'selected' : null;
    return (
      <li key={i}>
        <button className={classSelected || undefined} onClick={() => handleClick(name)}>
          {name}
        </button>
      </li>
    );
  });

  return (
    <footer className="footer">
      <span className="todo-count">{countLeft} items left</span>
      <ul className="filters">{buttonsNodes}</ul>
      <button className="clear-completed" onClick={clearCompleteFunc}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
