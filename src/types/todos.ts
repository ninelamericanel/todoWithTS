export interface TodoItem {
  description: string;
  id: string;
  created: Date;
  status: string;
  display: boolean;
}

export interface FilterButtons {
  name: string;
  selected: boolean;
}
