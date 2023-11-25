// import { Observable } from "rxjs";

// const sequence$ = new Observable((subscriber) => {
//   let count = 1;
//   const intervalId = setInterval(() => {
//     if (count % 5 === 0) {
//       clearInterval(intervalId);
//       subscriber.complete();
//       return
//     }
//     // subscriber.error('test error');
//     subscriber.next(count++);
//   }, 1000)

//   return () => {
//     console.log('unsubscribe');
//     clearInterval(intervalId);
//   }
// })

// const subscription = sequence$.subscribe(
//   (v) => {
//     console.log(v);
//   },
//   (err) => {
//     console.log('Err:', err);
//   },
//   () => {
//     console.log('completed');
//   }
// )

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 3000)

import { interval } from "rxjs";

const sequence$ = interval(1000);

const sub1 = sequence$.subscribe((v) => {
  console.log('Sub 1', v);
})

const sub2 = sequence$.subscribe((v) => {
  console.log('Sub 2', v);
})

setTimeout(() => {
  sub1.unsubscribe();
}, 3000)
