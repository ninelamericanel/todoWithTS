import React from 'react';

import { PropsContextType } from 'types/todos';

const defaultValue: PropsContextType = {
  onDeletedFunc: () => undefined,
  editingTaskFunc: () => undefined,
  onChangeStatusFunc: () => undefined,
  timerFormatFunc: () => '00',
  onChangeTimerFunc: () => undefined,
  clearCompleteFunc: () => undefined,
  onFilterTodosFunc: () => undefined,
  onAddTodoFunc: () => undefined,
};

export const PropsContext = React.createContext<PropsContextType>(defaultValue);
