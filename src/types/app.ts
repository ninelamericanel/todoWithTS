export type OnCompletedFunc = (id: string) => void;

export type OnDeletedFunc = (id: string) => void;

export type OnAddFunc = (name: string, min: string, sec: string) => void;

export type ClearCompleteFunc = () => void;

export type OnSelectedFilterFunc = (name: string) => void;

export type OnFilterTodosFunc = (name: string) => void;

export type FindMaxIdFunc = () => string;

export type OnEditingFunc = (id: string) => void;

export type EditingTaskFunc = (value: string, id: string) => void;

export type TimerFormatFunc = (num: number) => string;
