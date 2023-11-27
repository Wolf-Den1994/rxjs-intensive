/**
    ---0---1---2---3---4---5---6---

    skipLimit(2,2)

    -----------2---3-----------6---
 */

import './skip-limit'
import { fromEvent, interval, Observable, pluck, Subscriber } from "rxjs";

class SkipLimitSubsciber extends Subscriber<any> {
  private interval: number = 1;
  private count: number = 1;

  constructor(
    sub: Subscriber<any>,
     private skip: number,
      private limit: number
  ) {
    super(sub);
  }

  next(value: number): void {
    const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
    const borderRight = borderLeft + this.limit;

    if (borderLeft < this.count && this.count <= borderRight) {
      super.next(value);
      this.count++;

      if (borderRight < this.count) {
        this.interval++;
      }
      return
    }

    this.count++;
  }
}

function skipLimit(skip: number, limit: number) {
  return (source$: Observable<any>) => {
    return source$
      .lift({
        call(subscriber: Subscriber<unknown>, source: any): | void {
          source.subscribe(new SkipLimitSubsciber(subscriber, skip, limit))
        }
      })
  }
}

// interval(1000)
fromEvent(document, 'click')
  .pipe(
    pluck('clientX'),
    skipLimit(2, 2)
  )
  .subscribe(
    console.log,
    () => {},
    () => {
      console.log('completed');
    }
  )
