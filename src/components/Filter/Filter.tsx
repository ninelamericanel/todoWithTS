import React, { FC } from 'react';

import { HandleClickFilterButtonFunc } from 'types/todos';

interface Props {
  handleClickFilterButton: HandleClickFilterButtonFunc;
  button: string;
}

const Filter: FC<Props> = ({ handleClickFilterButton, button }) => {
  const buttonNodes = ['All', 'Active', 'Completed'].map((name, i) => {
    const classSelected = name === button ? 'selected' : null;
    return (
      <li key={i}>
        <button className={classSelected || undefined} onClick={() => handleClickFilterButton(name)}>
          {name}
        </button>
      </li>
    );
  });
  return <>{buttonNodes}</>;
};

export default Filter;
