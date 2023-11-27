import { concatAll, debounceTime, exhaust, fromEvent, interval, map, mergeAll, mergeMap, of, pluck, switchAll, switchMap } from "rxjs";
import { ajax } from 'rxjs/ajax'

// interval(2000)
//   .pipe(
//     map((v) => {
//       return of(v * 2)
//     })
//   )
//   .subscribe((v) => {
//     v.subscribe((x) => {
//       console.log(x);
//     })
//   })

const inputEl = document.querySelector('input') as HTMLInputElement;
const sequence$ = fromEvent(inputEl, 'input')
  .pipe(
    // map((e) => {
    //   const value = (e.target as HTMLInputElement).value;
    //   return ajax(`https://api.github.com/search/repositories?q=${value}`)
    // }),
    // mergeAll(),

    // map + mergeAll = mergeMap
    // mergeMap((e) => {
    //   const value = (e.target as HTMLInputElement).value;
    //   return ajax(`https://jsonplaceholder.typicode.com/todos/${value}`)
    // }, 2),

    // map((e) => {
    //   const value = (e.target as HTMLInputElement).value;
    //   return ajax(`https://jsonplaceholder.typicode.com/todos/${value}`)
    // }),
    // switchAll(),

    // map + switchAll = switchMap
    // switchMap((e) => {
    //   const value = (e.target as HTMLInputElement).value;
    //   return ajax(`https://jsonplaceholder.typicode.com/todos/${value}`)
    // }), /** подписывается на послдений */

    // map((e) => {
    //   const value = (e.target as HTMLInputElement).value;
    //   return ajax(`https://jsonplaceholder.typicode.com/todos/${value}`)
    // }),
    // concatAll(),
    
    // map + concatAll = concatMap === map + mergeAll(1)

    map((e) => {
      const value = (e.target as HTMLInputElement).value;
      return ajax(`https://jsonplaceholder.typicode.com/todos/${value}`)
    }),
    exhaust(),
    // map + exhaust = exhaustMap /** подписывается на первый, скипает остальные */

    pluck('response')
  )
  .subscribe((v) => {
    console.log(v);
  })