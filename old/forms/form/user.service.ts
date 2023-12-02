import { Observable, pluck, concatAll, toArray, map, shareReplay, timer, switchMap } from "rxjs"
import { ajax } from 'rxjs/ajax'

class UserService {
  private uniqueNameSequence$: Observable<any>;

  public getNames() {
    if (!this.uniqueNameSequence$) {
      // this.uniqueNameSequence$ = ajax('https://jsonplaceholder.typicode.com/todos')
      //   .pipe(
      //     map((res: any) => res.response),
      //     concatAll(),
      //     map((user: any) => user.title),
      //     toArray(),
      //     shareReplay(),
      //   )
      this.uniqueNameSequence$ = timer(0, 16000)
        .pipe(
          switchMap(() => {
            return ajax('https://jsonplaceholder.typicode.com/todos')
            .pipe(
              map((res: any) => res.response),
              concatAll(),
              map((user: any) => user.title),
              toArray(),
              shareReplay(),
            )
            }),
          shareReplay()
        )
    }

    return this.uniqueNameSequence$;
  }
}

export const userService = new UserService()
