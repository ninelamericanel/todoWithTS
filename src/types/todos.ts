export interface TodoItem {
  description: string;
  id: string;
  created: Date;
  status: string;
}

export interface FilterButtons {
  name: string;
  selected: boolean;
}
