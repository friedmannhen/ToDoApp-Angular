export interface ITodo {
  id: number;
  title: string;
  openDate: Date;
  description: string;
  isCompleted: boolean;
  isArchived: boolean;
  endDate: Date | number | string;
  selected: boolean;
}
