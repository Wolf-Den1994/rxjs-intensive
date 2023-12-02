import { interval, of, zip, map, catchError, tap, EMPTY, retry, retryWhen, delay, switchMap, fromEvent } from "rxjs";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

const sequence$ = zip(sequence1$, sequence2$);

// sequence$
//   .pipe(
//     // map(([_x, y]: [number, number | string]) => {
//     //   return (y as any).toUpperCase();

//     //   // try {
//     //   //   return (y as any).toUpperCase();
//     //   // } catch (err) {
//     //   //   console.log(err);
//     //   //   return '0';
//     //   // }
//     // }),
//     switchMap(([_x, y]: [number, number | string]) => {
//       return of(y)
//         .pipe(
//           map((y) => {
//             return (y as any).toUpperCase();
//           }),
//           catchError((err, source$) => {
//             console.log('CATCH err', err);
//             return EMPTY;
//           }),
//         )
//     }),
//     // tap(() => {
//     //   console.log('without error');
//     // }),
//     // // retry(3),
//     // retryWhen((errObs) => errObs.pipe(delay(5000))),
//     // catchError((err, source$) => {
//     //   console.log('CATCH err', err);
//     //   return EMPTY;
//     //   // return source$;
//     // }),
//     // tap(() => {
//     //   console.log('after catch');
//     // })
//   )
//   .subscribe(
//     (v) => {
//       console.log(v);
//     },
//     (err) => {
//       console.log('Err', err);
//     },
//     () => {
//       console.log('completed');
//     }
//   )

fromEvent(document, 'click')
    .pipe(
      switchMap(() => {
        return sequence$
          .pipe(
            // map(([_x, y]: [number, number | string]) => {
            //   return (y as any).toUpperCase();
        
            //   // try {
            //   //   return (y as any).toUpperCase();
            //   // } catch (err) {
            //   //   console.log(err);
            //   //   return '0';
            //   // }
            // }),
            switchMap(([_x, y]: [number, number | string]) => {
              return of(y)
                .pipe(
                  map((y) => {
                    return (y as any).toUpperCase();
                  }),
                  catchError((err, source$) => {
                    console.log('CATCH err', err);
                    return EMPTY;
                  }),
                )
            }),
            // tap(() => {
            //   console.log('without error');
            // }),
            // // retry(3),
            // retryWhen((errObs) => errObs.pipe(delay(5000))),
            // catchError((err, source$) => {
            //   console.log('CATCH err', err);
            //   return EMPTY;
            //   // return source$;
            // }),
            // tap(() => {
            //   console.log('after catch');
            // })
          )
      })
    )
      .subscribe(
        (v) => {
          console.log(v);
        },
        (err) => {
          console.log('Err', err);
        },
        () => {
          console.log('completed');
        }
      )