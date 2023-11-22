// const sequence = new Promise((res) => {
//     let count = 1;
//     setInterval(() => {
//         res(count++);
//     })
// })
// sequence.then(console.log);
// sequence.then(console.log);

// const sequence = function* iteratorFn() {
//     let item = 1;
//     while (true) {
//         yield item++;
//     }
// }()
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);

import { interval } from 'rxjs';

interval(1000)
  .subscribe((v) => {
    console.log(v);
  })

