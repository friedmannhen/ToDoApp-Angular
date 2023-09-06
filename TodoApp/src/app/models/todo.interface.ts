export interface ITodo {
  id: number;
  title: string;
  openDate: Date;
  descriptionLines: string[];
  linesCompleted: boolean[];
  isCompleted: boolean;
  isArchived: boolean;
  endDate: Date | number | string;
  selected: boolean;
}
