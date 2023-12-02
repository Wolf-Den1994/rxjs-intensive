import { bufferCount, concatAll, debounceTime, distinctUntilChanged, filter, map, Observable, reduce, switchMap } from "rxjs";

export interface ResultRepository {
  name: string;
  description: string;
  owner: {
    avatar_url: string;
  }
}

export function liveSearch(
  source$: Observable<InputEvent>,
  reqeust$: (text: string) => Observable<any>,
) {
  return source$
    .pipe(
      debounceTime(600),
      map((v: InputEvent) => {
        const target = v.target as HTMLInputElement;
        return target.value.trim();
      }),
      filter((v) => v.length > 3),
      distinctUntilChanged(),
      switchMap(reqeust$),
    )
}

export function request(source$: Observable<any>) {
  return source$
    .pipe(
      map<any, ResultRepository[]>((res: any) => res.response.items),
      concatAll(),
      map((item: ResultRepository) => {
        return createCard(item);
      }),
      bufferCount(3),
      reduce((resultStr: string, htmlStrs: string[]) => {
        return resultStr += createRow(htmlStrs);
      }, ''),
      map((htmlStr) => htmlStr.trim().replace(/\s+(<)/g, '<')),
    )
}

function createCard({ name, description, owner: { avatar_url } }: ResultRepository) {
  return `
    <div class="col-md-4">
      <div class="card">
        <img class="card-img-top" src="${avatar_url}" alt="${name}" />
        <div>
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    </div>
  `
}

function createRow(htmlStrings: string[]) {
  return `
    <div class="row">
      ${htmlStrings.join(' ')}
    </div>
  `
}