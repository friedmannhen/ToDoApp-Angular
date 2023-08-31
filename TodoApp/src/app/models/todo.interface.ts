export interface ITodo {
  id: number;
  title: string;
  description: string;
  content: string;
  isCompleted: boolean;
  isArchived: boolean;
  endDate: Date | number | string;
  selected: boolean;
}
