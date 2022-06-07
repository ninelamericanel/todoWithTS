import React from 'react';
import './NewTaskForm.scss';

import { FormType, HandleChangeFunc } from 'types/todos';

interface Props {
  form: FormType;
  handleChange: HandleChangeFunc;
}

const NewTaskForm: React.FC<Props> = ({ handleChange, form: { title, min, sec } }) => {
  const forms = [
    { placeholder: 'What needs to be done?', className: 'new-todo', dataAction: 'task-name', value: title },
    { placeholder: 'Min', className: 'new-todo-form__timer', dataAction: 'task-min', value: min },
    { placeholder: 'Sec', className: 'new-todo-form__timer', dataAction: 'task-sec', value: sec },
  ];

  const nodesForm = forms.map((form, id) => {
    return (
      <input
        onChange={handleChange}
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
