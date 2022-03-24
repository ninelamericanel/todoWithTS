export interface TodoItem {
    description: string;
    id: string;
    completed: boolean;
    editing: boolean;
    created: Date;
}

export interface FilterBtns {
    name: string,
    selected: boolean
}