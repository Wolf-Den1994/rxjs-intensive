import { interval, Subject, ReplaySubject, multicast, ConnectableObservable, publish, refCount, share } from "rxjs";

/**
 * ConnectableObservable
 */

// const control = new Subject()
// const control = new ReplaySubject(2)

const sequence$ = interval(1000)
  .pipe(
    // multicast(control)
    // publish(), // new Subject + multicast(control)
    // refCount() // sequence$.connect()
    share() // publish + refCount
  ) as ConnectableObservable<any>;

// sequence$.connect();

const sub1 = sequence$
  .subscribe((v) => {
    console.log('sub 1', v);
  })

setTimeout(() => {
  sub1.unsubscribe();
}, 3000)

setTimeout(() => {
  sequence$
    .subscribe((v) => {
      console.log('sub 2', v);
    })
}, 5000)

setTimeout(() => {
  sequence$
    .subscribe((v) => {
      console.log('sub 3', v);
    })
}, 7000)