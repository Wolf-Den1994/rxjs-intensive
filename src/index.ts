import { of, async, asap, from, combineLatest, map, Subject, take, observeOn, queue, subscribeOn } from "rxjs";

// console.log('start');
// of(1, 2, 3, 4)                   // sync
//   .subscribe(console.log)
// console.log('end');

// console.log('start');
// of(1, 2, 3, 4, async)            // async
//   .subscribe(console.log)
// console.log('end');

// console.log('start');
// of(1, 2, 3, 4, asap)             // asap
//   .subscribe(console.log)
// console.log('end');


// const a$ = from([1, 2], asap);
// const b$ = of(10);

// const c$ = combineLatest([a$, b$])
//   .pipe(
//     map(([a, b]) => a + b)
//   )

// c$.subscribe(console.log)

const signal = new Subject<number>();
let count = 0;
const calc = (count: number) => console.log('do some calc', count);
console.log('start');
signal.pipe(
  observeOn(queue),
  // subscribeOn(queue),
  take(1600)
)
  .subscribe((v: number) => {
    calc(v);
    signal.next(v++)
  })
signal.next(count++)
console.log('end');
