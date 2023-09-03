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
      description: 'Streptopelia senegalensis',
      isCompleted: false,
      isArchived: false,
      endDate: '08/03/2023',
      selected: true,
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos magni quisquam, libero odit at aspernatur facere nulla, illum fuga modi in, veritatis incidunt numquam asperiores eligendi accusamus a nobis reprehenderit.',
    },
    {
      id: 2,
      title: "Zorro, azara's",
      description: 'Pseudalopex gymnocercus',
      isCompleted: false,
      isArchived: false,
      endDate: '03/12/2022',
      selected: false,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsa dicta omnis beatae obcaecati. Nulla, praesentium animi asperiores at facilis quas quaerat minus perspiciatis, officiis facere numquam iure, voluptas inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rem obcaecati architecto deleniti. Est nobis optio a quasi sunt minima. Ullam minus pariatur iusto officiis, et quos a tempora vitae.',
    },
    {
      id: 3,
      title: 'Bontebok',
      description: 'Damaliscus dorcas',
      isCompleted: true,
      isArchived: false,
      endDate: '17/01/2023',
      selected: false,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, corrupti nobis itaque enim unde delectus amet minima rem commodi, neque mollitia temporibus, hic autem! Esse, consectetur mollitia? Consectetur, dicta voluptas?',
    },
    {
      id: 4,
      title: 'Grouse, sage',
      description: 'Centrocercus urophasianus',
      isCompleted: false,
      isArchived: false,
      endDate: '12/09/2022',
      selected: false,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero id alias sint repellat nulla quibusdam facilis architecto possimus dolore ipsum, rem doloremque hic beatae ad quae, repudiandae earum. Cupiditate, repellendus. Nisi, cum provident, fugit dolorum deleniti eligendi laboriosam ut ratione sint inventore nobis nihil voluptatibus temporibus autem, omnis quibusdam. Eveniet assumenda inventore maiores error ipsa. Accusantium dolor quis consequatur soluta! Ex dignissimos cupiditate qui? Vitae repellat alias corrupti possimus, vero ipsum nesciunt veritatis quibusdam, nihil expedita ea? Nemo, corrupti. Placeat mollitia laboriosam dolore possimus quo obcaecati? Officiis, nulla! Recusandae, maxime? Quasi minus ipsam qui ea placeat, enim maiores rerum tempore, eius dolor facilis soluta unde? Ipsam illo aliquam fugit quia optio, qui repellendus et iste perspiciatis, ipsum labore laborum officia! Provident, accusamus eius? Optio ullam, nesciunt sunt rerum nihil, unde beatae quibusdam quam quidem voluptates tempore. Obcaecati perferendis delectus asperiores consequatur ut libero porro veniam dolorum unde? Optio, ad. Ea! Omnis explicabo maxime hic neque dolorem odio quos sapiente consectetur sed quibusdam, quidem ipsa iure eius, delectus dolores fuga voluptate blanditiis! Neque nulla officia sunt repellat natus repellendus voluptate molestiae? Officiis eveniet commodi vitae facilis aliquam possimus quo molestiae numquam, adipisci soluta minima eaque. Cupiditate voluptatum perferendis quia excepturi quibusdam eum eveniet nostrum ad illum, dignissimos, enim impedit consequuntur aliquam. Nemo at eum esse quibusdam ex corporis repellat possimus ullam cum fuga placeat animi, dignissimos blanditiis! Vitae similique eius, provident officia enim consequuntur ea veniam labore, fugiat, nisi deleniti nihil! Enim debitis reiciendis sapiente! Quasi eos repellat quo pariatur aliquam debitis necessitatibus natus aliquid, expedita voluptate in totam odit similique ducimus sed ullam, ad voluptatum error eum inventore aspernatur deleniti? Modi, sint adipisci harum quaerat saepe veritatis ipsam sunt sapiente error quis fugit nobis facilis nemo laborum. Voluptatum tempora, similique et tenetur inventore quis autem magnam magni, iure, porro distinctio?',
    },
    {
      id: 5,
      title: 'Puffin, horned',
      description: 'Fratercula corniculata',
      isCompleted: false,
      isArchived: false,
      endDate: '10/06/2023',
      selected: false,
      content:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, laboriosam praesentium dolorem illo repudiandae magnam deleniti? Error suscipit doloremque expedita consequatur? Delectus excepturi repellendus incidunt veritatis praesentium fugiat unde aspernatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos blanditiis esse ipsam sed, corrupti minima vel neque laboriosam cum rerum necessitatibus ipsa natus eaque distinctio quos corporis dolorum doloribus labore. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis cum, obcaecati odio eos dolorem nobis ex repudiandae rem maxime placeat exercitationem iure pariatur perspiciatis, beatae corrupti eum mollitia perferendis harum?',
    },
    {
      id: 6,
      title: 'Ringtail',
      description: 'Bassariscus astutus',
      isCompleted: false,
      isArchived: false,
      endDate: '15/10/2023',
      selected: false,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, rem. Nesciunt, blanditiis minus libero, dolores doloribus, minima assumenda enim asperiores saepe itaque modi nulla? Inventore ipsum consequatur mollitia sit incidunt? In, rerum! Laborum, distinctio suscipit illum dicta facilis officia magni eveniet inventore consequuntur, quidem ullam doloremque hic unde quisquam cupiditate quis! Consequatur sed facere quos quas corporis recusandae eaque praesentium?',
    },
    {
      id: 7,
      title: 'Genet, common',
      description: 'Genetta genetta',
      isCompleted: true,
      isArchived: false,
      endDate: '15/04/2024',
      selected: false,
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos eligendi alias quam explicabo modi corporis sed cupiditate aliquam, illum, ipsam laboriosam consectetur dolorum ipsum officia minus dolorem mollitia. Officia, in! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus nihil, vitae sapiente exercitationem harum at error atque eaque nesciunt! Repellat architecto animi eligendi sint culpa itaque aliquam totam unde quas.',
    },
    {
      id: 8,
      title: 'Common raccoon',
      description: 'Procyon lotor',
      isCompleted: false,
      isArchived: false,
      endDate: '03/02/2023',
      selected: false,
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et nesciunt maiores ea excepturi quis quibusdam quaerat rerum dolore nostrum. Vel dolor enim esse labore, rerum eum dolorum magnam perferendis.',
    },
    {
      id: 9,
      title: 'Black and white colobus',
      description: 'Colobus guerza',
      isCompleted: false,
      isArchived: false,
      endDate: '20/04/2024',
      selected: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident libero, at quaerat, dicta accusamus sint, ullam praesentium porro perferendis delectus odio. Animi dolor ea commodi ad vel ratione ipsam voluptatibus?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus in nemo repudiandae animi, minus fugit ipsum id minima culpa quas quae fuga quis qui impedit, beatae, pariatur corporis deleniti asperiores?',
    },
    {
      id: 10,
      title: 'Savanna baboon',
      description: 'Papio cynocephalus',
      isCompleted: false,
      isArchived: false,
      endDate: '06/11/2022',
      selected: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa a temporibus fugiat at, reprehenderit consequuntur ea aut ratione vitae eius et suscipit est officiis fuga soluta dolorem obcaecati cupiditate beatae.',
    },
    {
      id: 11,
      title: 'Squirrel, grey-footed',
      description: 'Paraxerus cepapi',
      isCompleted: false,
      isArchived: true,
      endDate: '22/12/2022',
      selected: false,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dignissimos est reprehenderit delectus vero sed consequuntur. Quibusdam vel minus voluptatum, labore quia, iusto doloremque vitae temporibus quidem illum facere! In?',
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
  public setNewTodo(newTodo: ITodo): void {
    this.mock = { ...this.mock, ...newTodo };
  }
}
