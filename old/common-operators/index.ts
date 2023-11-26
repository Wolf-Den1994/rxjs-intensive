import { debounceTime, filter, first, fromEvent, interval, map, pluck, skip, take, tap } from "rxjs";

const sequence1$ = interval(1000);

/**
 * sequence1$ ---0---1---2---3---4---5---
 * 
 * tap((v) => {
 *    console.log(v)
 *    return [1, 2, 3, 4]
 * })
 *            ---0---1---2---3---4---5---
 * 
 * filter((v) => v % 2 === 0)
 *            ---0-------2-------4-------
 * 
 * map((v) => v ** 2)
 *            ---0-------4-------16-------
 * 
 * skip(2)
 *            -------------------16-------
 * 
 * take(1) // first()
 * sequence2$ ---0-------4-------16|
 */

sequence1$
  .pipe(
    tap((v) => {
      console.log(v)
      return [1, 2, 3, 4]
    }),
    filter((v) => v % 2 === 0),
    map((v) => v ** 2),
    skip(2),
    // take(1),
    first(),
  )
  .subscribe(
    (v) => {
      console.log('Result', v);
    },
    () => {},
    () => {
      console.log('completed')
    }
  )

const el = document.querySelector('input') as HTMLInputElement;
fromEvent(el, 'input')
  .pipe(
    debounceTime(300),
    pluck('target', 'value')
  )
  .subscribe((v) => {
    console.log(v);
  })
