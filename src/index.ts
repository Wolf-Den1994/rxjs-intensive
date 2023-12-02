/**
 * Subject
 */

// // Subject = Observable + Subscriber

// import { Subject } from "rxjs";

// const sequence$$ = new Subject();

// sequence$$.next('RxJS');
// sequence$$.next('Angular');

// sequence$$.subscribe((v) => {
//   console.log(v);
// })

// sequence$$.next('Node');

/**
 * Service
 */
import './component-1';
import './component-2';

/**
 * AsyncSubject
 */

// import { AsyncSubject } from 'rxjs';

// const sequence$$ = new AsyncSubject();

// sequence$$.subscribe((v) => {
//   console.log('Sub 1', v);
// })

// sequence$$.next('Hi all');
// sequence$$.next('RxJs');
// sequence$$.next('Redux');
// sequence$$.next('Node');

// setTimeout(() => {
//   sequence$$.complete();
//   sequence$$.subscribe((v) => {
//     console.log('Sub 2', v);
//   })
// }, 5000)

import { Observable, AsyncSubject } from 'rxjs';
import { ajax } from 'rxjs/ajax'

function getItems(url: string) {
  let subject: AsyncSubject<any>;
  return new Observable((subscriber) => {
    if (!subject) {
      subject = new AsyncSubject();
      ajax(url).subscribe(subject);
    }

    return subject.subscribe(subscriber)
  })
}

const items = getItems('https://jsonplaceholder.typicode.com/todos')
items.subscribe((v) => {
  console.log('todos 1', v)
})

setTimeout(() => {
  items.subscribe((v) => {
    console.log('todos 2', v)
  })
}, 5000)
