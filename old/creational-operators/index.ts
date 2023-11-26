import { bindNodeCallback, defer, from, iif, map, of } from "rxjs";
import { ajax } from 'rxjs/ajax'

// const sequence$ = of(1, 2, 3, 4)
// sequence$.subscribe((v) => {
//   console.log(v);
// })

// const sequence$ = from([1, 2, 3, 4])
// sequence$.subscribe((v) => {
//   console.log(v);
// })

// const sequence$ = from(
//   fetch('https://jsonplaceholder.typicode.com/todos')
//     .then((res) => res.json())
// )
// sequence$.subscribe((v) => {
//   console.log(v);
// })

// const random = Math.round(Math.random() * 10)
// const sequence$ = iif(() => {
//   return random > 5;
// }, of('Value > 5'), of('Value < 5'))
// sequence$.subscribe((v) => {
//   console.log(v);
// })

// const random = Math.round(Math.random() * 10)
// const sequence$ = defer(() => {
//   return random > 5
//     ? random >= 8
//       ? of('Value >= 8')
//       : of('Value > 5 < 8')
//     : of('Value < 5')
// })
// sequence$.subscribe((v) => {
//   console.log(v);
// })

// const sequence$ = ajax('https://jsonplaceholder.typicode.com/todos')
// sequence$.subscribe((v) => {
//   console.log(v.response);
// })

// import fs from 'fs/promises';
import fs from 'fs';
import path from 'path';

// const readdir$ = from(fs.readFile(path.resolve(__dirname, 'text')));
const readdir$ = bindNodeCallback(fs.readFile)(path.resolve(__dirname, 'text'))
readdir$
  .pipe(
    map((buffer) => {
      const str = buffer.toString();
      const regExp = />([^<]+)</;
      const matches = regExp.exec(str);
      return matches && matches[1];
    })
  )
  .subscribe((v) => {
    console.log(v);
  })
