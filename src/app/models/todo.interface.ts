export interface ITodo {
  id: string;
  title: string;
  openDate: Date;
  descriptionLines: string[];
  linesCompleted: boolean[];
  isCompleted: boolean;
  isArchived: boolean;
  endDate: Date ;
  endTime:string;
  selected: boolean;
  timesOver:boolean;
}
