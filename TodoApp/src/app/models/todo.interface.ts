export interface ITodo {
  id: string;
  title: string;
  openDate: Date;
  descriptionLines: string[];
  linesCompleted: boolean[];
  isCompleted: boolean;
  isArchived: boolean;
  endDate: Date | number | string;
  selected: boolean;
}
