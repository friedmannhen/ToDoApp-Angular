import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private mock: ITodo[] = [
    {
      title: 'Laughing dove',
      description: 'Streptopelia senegalensis',
      isCompleted: true,
      isArchived: true,
      endDate: '08/03/2023',
    },
    {
      title: "Zorro, azara's",
      description: 'Pseudalopex gymnocercus',
      isCompleted: false,
      isArchived: true,
      endDate: '03/12/2022',
    },
    {
      title: 'Bontebok',
      description: 'Damaliscus dorcas',
      isCompleted: false,
      isArchived: true,
      endDate: '17/01/2023',
    },
    {
      title: 'Grouse, sage',
      description: 'Centrocercus urophasianus',
      isCompleted: false,
      isArchived: false,
      endDate: '12/09/2022',
    },
    {
      title: 'Puffin, horned',
      description: 'Fratercula corniculata',
      isCompleted: true,
      isArchived: false,
      endDate: '10/06/2023',
    },
    {
      title: 'Ringtail',
      description: 'Bassariscus astutus',
      isCompleted: true,
      isArchived: true,
      endDate: '15/10/2023',
    },
    {
      title: 'Genet, common',
      description: 'Genetta genetta',
      isCompleted: true,
      isArchived: false,
      endDate: '15/04/2024',
    },
    {
      title: 'Common raccoon',
      description: 'Procyon lotor',
      isCompleted: true,
      isArchived: true,
      endDate: '03/02/2023',
    },
    // {
    //   title: 'Black and white colobus',
    //   description: 'Colobus guerza',
    //   isCompleted: true,
    //   isArchived: true,
    //   endDate: '20/04/2024',
    // },
    // {
    //   title: 'Savanna baboon',
    //   description: 'Papio cynocephalus',
    //   isCompleted: true,
    //   isArchived: false,
    //   endDate: '06/11/2022',
    // },
    // {
    //   title: 'Squirrel, grey-footed',
    //   description: 'Paraxerus cepapi',
    //   isCompleted: false,
    //   isArchived: true,
    //   endDate: '22/12/2022',
    // },
  ];
  private _todoSubject: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(
    this.mock
  );
  constructor() {}
  public getTodos(): Observable<Array<ITodo>> {
    return this._todoSubject.asObservable();
  }
}
