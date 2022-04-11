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
