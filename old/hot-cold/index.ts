import { Observable } from "rxjs";

const socket: WebSocket = new WebSocket('wss://echo.websocket.org');
const sequence$ = new Observable((subscriber) => {
  socket.addEventListener('message', (e) => {
    subscriber.next(e)
  })

  // let count = 1;
  // const intervalId = setInterval(() => {
  //   // if (count % 5 === 0) {
  //   //   clearInterval(intervalId);
  //   //   subscriber.complete();
  //   //   return
  //   // }
  //   // subscriber.error('test error');
  //   subscriber.next(count++);
  // }, 1000)

  // return () => {
  //   console.log('unsubscribe');
  //   clearInterval(intervalId);
  // }
})

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

/**
 * Cold
 */
// import { interval } from "rxjs";

// const sequence$ = interval(1000);

// const sub1 = sequence$.subscribe((v) => {
//   console.log('Sub 1', v);
// })

// setTimeout(() => {
//   sequence$.subscribe((v) => {
//     console.log('Sub 2', v);
//   })
// }, 5000)

/**
 * Hot
 */
// import { fromEvent } from "rxjs";

// const sequence$ = fromEvent<MouseEvent>(document, 'click');

const sub1 = sequence$.subscribe((v) => {
  console.log('Sub 1', v);
})
socket.addEventListener('open', () => {
  let count = 1;
  const intervalId = setInterval(() => {
    socket.send((count++).toString())
  }, 1000)
})

setTimeout(() => {
  sequence$.subscribe((v) => {
    console.log('Sub 2', v);
  })
}, 5000)
