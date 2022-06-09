import React, { FC } from 'react';
import './NewTaskForm.scss';

import { FormType, HandleChangeInputFunc } from 'types/todos';
interface Props {
  handleChangeForm: HandleChangeInputFunc;
  form: FormType;
}

const NewTaskForm: FC<Props> = ({ handleChangeForm, form: { title, min, sec } }) => {
  const forms = [
    { placeholder: 'What needs to be done?', className: 'new-todo', dataAction: 'task-name', value: title },
    { placeholder: 'Min', className: 'new-todo-form__timer', dataAction: 'task-min', value: min },
    { placeholder: 'Sec', className: 'new-todo-form__timer', dataAction: 'task-sec', value: sec },
  ];

  const nodesForm = forms.map((form, id) => {
    return (
      <input
        onChange={handleChangeForm}
        autoFocus
        placeholder={form.placeholder}
        className={form.className}
        data-action={form.dataAction}
        value={form.value}
        key={id}
      />
    );
  });

  return <>{nodesForm}</>;
};

export default NewTaskForm;
