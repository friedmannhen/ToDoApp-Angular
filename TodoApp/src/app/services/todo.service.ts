import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private mock: ITodo[] = [
    {
      id: 1,
      title: 'Laughing dove',
      openDate: new Date(),
      isCompleted: false,
      isArchived: false,
      endDate: '08/03/2023',
      selected: true,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos magni quisquam, libero odit at aspernatur facere nulla, illum fuga modi in, veritatis incidunt numquam asperiores eligendi accusamus a nobis reprehenderit.',
    },
    {
      id: 2,
      title: "Zorro, azara's",
      openDate: new Date(),
      isCompleted: false,
      isArchived: false,
      endDate: '03/12/2022',
      selected: false,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsa dicta omnis beatae obcaecati. Nulla, praesentium animi asperiores at facilis quas quaerat minus perspiciatis, officiis facere numquam iure, voluptas inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rem obcaecati architecto deleniti. Est nobis optio a quasi sunt minima. Ullam minus pariatur iusto officiis, et quos a tempora vitae.',
    },
    {
      id: 3,
      title: 'Bontebok',
      openDate: new Date(),
      isCompleted: true,
      isArchived: false,
      endDate: '17/01/2023',
      selected: false,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, corrupti nobis itaque enim unde delectus amet minima rem commodi, neque mollitia temporibus, hic autem! Esse, consectetur mollitia? Consectetur, dicta voluptas?',
    },
    {
      id: 4,
      title: 'Grouse, sage',
      openDate: new Date(),
      isCompleted: false,
      isArchived: false,
      endDate: '12/09/2022',
      selected: false,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero id alias sint repellat nulla quibusdam facilis architecto possimus dolore ipsum, rem doloremque hic beatae ad quae, repudiandae earum. Cupiditate, repellendus. Nisi, cum provident, fugit dolorum deleniti eligendi laboriosam ut ratione sint inventore nobis nihil voluptatibus temporibus autem, omnis quibusdam. Eveniet assumenda inventore maiores error ipsa. Accusantium dolor quis consequatur soluta! Ex dignissimos cupiditate qui? Vitae repellat alias corrupti possimus, vero ipsum nesciunt veritatis quibusdam, nihil expedita ea? Nemo, corrupti. Placeat mollitia laboriosam dolore possimus quo obcaecati? Officiis, nulla! Recusandae, maxime? Quasi minus ipsam qui ea placeat, enim maiores rerum tempore, eius dolor facilis soluta unde? Ipsam illo aliquam fugit quia optio, qui repellendus et iste perspiciatis, ipsum labore laborum officia! Provident, accusamus eius? Optio ullam, nesciunt sunt rerum nihil, unde beatae quibusdam quam quidem voluptates tempore. Obcaecati perferendis delectus asperiores consequatur ut libero porro veniam dolorum unde? Optio, ad. Ea! Omnis explicabo maxime hic neque dolorem odio quos sapiente consectetur sed quibusdam, quidem ipsa iure eius, delectus dolores fuga voluptate blanditiis! Neque nulla officia sunt repellat natus repellendus voluptate molestiae? Officiis eveniet commodi vitae facilis aliquam possimus quo molestiae numquam, adipisci soluta minima eaque. Cupiditate voluptatum perferendis quia excepturi quibusdam eum eveniet nostrum ad illum, dignissimos, enim impedit consequuntur aliquam. Nemo at eum esse quibusdam ex corporis repellat possimus ullam cum fuga placeat animi, dignissimos blanditiis! Vitae similique eius, provident officia enim consequuntur ea veniam labore, fugiat, nisi deleniti nihil! Enim debitis reiciendis sapiente! Quasi eos repellat quo pariatur aliquam debitis necessitatibus natus aliquid, expedita voluptate in totam odit similique ducimus sed ullam, ad voluptatum error eum inventore aspernatur deleniti? Modi, sint adipisci harum quaerat saepe veritatis ipsam sunt sapiente error quis fugit nobis facilis nemo laborum. Voluptatum tempora, similique et tenetur inventore quis autem magnam magni, iure, porro distinctio?',
    },
    {
      id: 5,
      title: 'Puffin, horned',
      openDate: new Date(),
      isCompleted: false,
      isArchived: false,
      endDate: '10/06/2023',
      selected: false,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, laboriosam praesentium dolorem illo repudiandae magnam deleniti? Error suscipit doloremque expedita consequatur? Delectus excepturi repellendus incidunt veritatis praesentium fugiat unde aspernatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos blanditiis esse ipsam sed, corrupti minima vel neque laboriosam cum rerum necessitatibus ipsa natus eaque distinctio quos corporis dolorum doloribus labore. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis cum, obcaecati odio eos dolorem nobis ex repudiandae rem maxime placeat exercitationem iure pariatur perspiciatis, beatae corrupti eum mollitia perferendis harum?',
    },

  ];
  private _singleTodoSubject: BehaviorSubject<ITodo> = new BehaviorSubject(
    this.mock[0]
  );
  private _todoSubject: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(
    this.mock
  );
  constructor() {}
  public getTodos(): Observable<Array<ITodo>> {
    return this._todoSubject.asObservable();
  }

  public getSelectedTodo(): Observable<ITodo> {
    return this._singleTodoSubject.asObservable();
  }

  public setSelectedTodo(todo: ITodo): void {
    this._singleTodoSubject.next(todo);
  }
  public addNewTodo(newTodo: ITodo): void {
    const existingTodos:Array<ITodo> = this._todoSubject.value;
    existingTodos.push(newTodo);
    this._todoSubject.next(existingTodos);
  }
}
