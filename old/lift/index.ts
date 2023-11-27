import { filter, interval, Observable, pipe, Subscriber, tap } from "rxjs";

function doNothing(source$: Observable<any>) {
  return source$;
}

function toText(source$: Observable<any>) {
  return new Observable((subscriber) => {
    subscriber.next('RxJs is Awesome!!!');
    subscriber.complete();
  })
}

class DoubleSubscriber extends Subscriber<number> {
  next(value: number): void {
    super.next(value * 2);
  }
}

/**
 * Usual pipe
 * @param {Function[]} fns 
 * @returns 
 */
const myPipe = (...fns: Function[]) => (source$: Observable<any>) => fns.reduce(
  (newSource, fn) => fn(newSource), source$
)

const filterWithDouble = myPipe(
  filter((x: number) => x % 3 === 0),
  double,
)

function double(source$: Observable<any>) {
  return source$
    .lift({
      call(subscriber: Subscriber<unknown>, source: any): | void {
        source.subscribe(new DoubleSubscriber(subscriber))
      }
    })
  // const o$ = new Observable();
  // o$.source = source$;
  // o$.operator = {
  //   call(subscriber: Subscriber<unknown>, source: any): | void {
  //     source.subscribe(new DoubleSubscriber(subscriber))
  //   }
  // }
  // return o$;
}

interval(1000)
  .pipe(
    // doNothing,
    // toText,
    filterWithDouble,
  )
  .subscribe(
    (v) => {
      console.log(v);
    },
    () => {},
    () => {
      console.log('completed');
    }
  )
