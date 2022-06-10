import React from 'react';

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

export type EditingTaskFunc = (id: string, value: string) => void;
export type OnChangeTimerFunc = (id: string, newSec: number) => void;
export type OnCompletedFunc = (id: string) => void;
export type MapperFunc = (callback: (todo: Todo) => Todo) => void;
export type FilterFunc = (callback: (todo: Todo) => boolean) => void;
export type NoParamsVoidFunc = () => void;
export type CreateNewTaskFunc = (description: string, min: string, sec: string) => Todo;
export type DisplayTodoFunc = () => boolean;
export type OnDeletedFunc = (id: string) => void;
export type OnAddTodoFunc = (name: string, min: string, sec: string) => void;
export type OnFilterTodosFunc = (name?: string) => void;
export type TimerFormatFunc = (num: number) => string;
export type HandleKeyUpFormFunc = (event: React.KeyboardEvent<HTMLFormElement>) => void;
export type HandleKeyUpInputFunc = (event: React.KeyboardEvent<HTMLInputElement>) => void;
export type HandleChangeInputFunc = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type HandleClickFilterButtonFunc = (nameButton: string) => void;
export type HandleClickButtonTimerFunc = () => void | null;
export type HandleEditTask = (value: string) => void;
