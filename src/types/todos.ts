export interface TodoItem {
  description: string;
  id: string;
  completed: boolean;
  editing: boolean;
  created: Date;
  display: boolean;
}

export interface FilterButtons {
  name: string;
  selected: boolean;
}
