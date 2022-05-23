import {PropsContext} from "../context/props-context";
import React from "react";

export interface TodoItem {
  description: string;
  id: string;
  created: Date;
  status: string;
  display: boolean;
  timer: {
    min: string;
    sec: string;
  };
}

export interface FilterButtons {
  name: string;
  selected: boolean;
}

export interface Todo {
  id: string;
  created: Date;
  description: string;
  display: boolean;
  status: string;
  min: string;
  sec: string;
}

export interface PropsContextType {
  onDeletedFunc: OnDeletedFunc;
  editingTaskFunc: EditingTaskFunc;
  onChangeStatusFunc: OnChangeStatusFunc;
  timerFormatFunc: TimerFormatFunc;
  onChangeTimerFunc: OnChangeTimerFunc;
  clearCompleteFunc: NoParamsVoidFunc;
  onFilterTodosFunc: OnFilterTodosFunc;
}

export type NoParamsVoidFunc = () => void;

export type CreateNewTaskFunc = (description: string, min: string, sec: string) => Todo;

export type FindMaxIdFunc = () => string;

export type OnChangeStatusFunc = (id: string, status: string) => void;

export type OnDeletedFunc = (id: string) => void;

export type OnAddTodoFunc = (name: string, min: string, sec: string) => void;

export type ClearCompleteFunc = () => void;

export type OnSelectedFilterFunc = (name: string) => void;

export type OnFilterTodosFunc = (name: string) => void;

export type OnEditingFunc = (id: string) => void;

export type EditingTaskFunc = (value: string, id: string) => void;

export type TimerFormatFunc = (num: number) => string;

export type OnChangeTimerFunc = (min: string, sec: string, id: string) => void;

export type HandleKeyUpFunc = (event: React.KeyboardEvent<HTMLFormElement>) => void;
export type HandleChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type HandleKeyUpInputFunc = (event: React.KeyboardEvent<HTMLInputElement>) => void;
export type HandleClickFunc = (nameButton: string) => void;
