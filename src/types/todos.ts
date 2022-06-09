import React from 'react';

export interface TodoFirst {
  id: string;
  created: Date;
  description: string;
  display: boolean;
  status: string;
  initialMin: string;
  initialSec: string;
}

export interface Todo {
  id: string;
  created: Date;
  description: string;
  display: boolean;
  completed: boolean;
  initialSec: number;
}

export type FormType = {
  title: string;
  min: string;
  sec: string;
};

export interface PropsContextType {
  onDeletedFunc: OnDeletedFunc;
  editingTaskFunc: EditingTaskFunc;
  onCompletedFunc: OnCompletedFunc;
  onChangeTimerFunc: OnChangeTimerFunc;
  clearCompleteFunc: NoParamsVoidFunc;
  onFilterTodosFunc: OnFilterTodosFunc;
  onAddTodoFunc: OnAddTodoFunc;
}

export type NoParamsVoidFunc = () => void;
export type CreateNewTaskFunc = (description: string, min: string, sec: string) => Todo;
export type FindMaxIdFunc = () => string;
export type DisplayTodoFunc = () => boolean;
export type OnCompletedFunc = (id: string) => void;
export type OnDeletedFunc = (id: string) => void;
export type OnAddTodoFunc = (name: string, min: string, sec: string) => void;
export type OnFilterTodosFunc = (name?: string) => void;
export type EditingTaskFunc = (value: string, id: string) => void;
export type TimerFormatFunc = (num: number) => string;
export type OnChangeTimerFunc = (newSec: number, id: string) => void;
export type HandleKeyUpFunc = (event: React.KeyboardEvent<HTMLFormElement>) => void;
export type HandleChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type HandleKeyUpInputFunc = (event: React.KeyboardEvent<HTMLInputElement>) => void;
export type HandleClickFunc = (nameButton: string) => void;
export type DisabledButtonPlayFunc = () => boolean;
