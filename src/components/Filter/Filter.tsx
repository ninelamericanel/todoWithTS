import React, { FC } from 'react';

import { HandleClickFilterButtonFunc } from 'types/todos';

interface Props {
  button: string;
  handleClick: HandleClickFilterButtonFunc;
}

const Filter: FC<Props> = ({ button, handleClick }) => {
  const buttonNodes = ['All', 'Active', 'Completed'].map((name, i) => {
    const classSelected = name === button ? 'selected' : null;
    return (
      <li key={i}>
        <button className={classSelected || undefined} onClick={() => handleClick(name)}>
          {name}
        </button>
      </li>
    );
  });
  return <>{buttonNodes}</>;
};

export default Filter;
