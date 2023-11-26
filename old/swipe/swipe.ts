import { fromEvent, map, merge, Observable, pluck, tap, zip } from "rxjs";

swipe(zip(
  getX(
    fromEvent<TouchEvent>(document, 'touchstart'),
    fromEvent<MouseEvent>(document, 'mousedown'),
  ),
  getX(
    fromEvent<TouchEvent>(document, 'touchend'),
    fromEvent<MouseEvent>(document, 'mouseup')
  )
)).subscribe((direction) => {
  if (direction < 0) {
    console.log('Swipe left');
    return;
  }
  console.log('Swipe right');
})

function getX(source1$: Observable<TouchEvent>, source2$: Observable<MouseEvent>) {
  return merge(source1$, source2$)
    .pipe(
      map((event: TouchEvent | MouseEvent) => {
        if (event instanceof TouchEvent) {
          return event.changedTouches[0].clientX
        }
        return event.clientX
      })
    )
}

function swipe(sources$: Observable<[number, number]>) {
  
  return sources$
    .pipe(
      map(([x, y]) => y - x)
    )
}