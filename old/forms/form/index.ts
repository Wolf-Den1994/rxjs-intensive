import { map, Observable, combineLatest, fromEvent, debounceTime, of, withLatestFrom, switchMap, EMPTY } from "rxjs";
import { userService } from "./user.service";

export class CreateForm {
  public valueSequence$: Observable<any>;

  private input: HTMLInputElement;
  private saveButton: HTMLButtonElement;

  public constructor(
    public formContainer: HTMLFormElement
  ) {
    this.input = formContainer.querySelector('input') as HTMLInputElement;
    this.saveButton = formContainer.querySelector('button') as HTMLButtonElement;

    this.valueSequence$ = combineLatest(
      fromEvent<InputEvent>(this.input, 'input')
        .pipe(
          map((e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            return target.value;
          }),
        ),
        userService.getNames(),
    )
      .pipe(
        debounceTime(600),
        switchMap(([value, names]) => {
          const isNotValid = names.find((name: string) => name === value);
          console.log(isNotValid)
          if (isNotValid) {
            this.input.classList.add('error');
            this.saveButton.disabled = true;
            return EMPTY;
          }

          this.input.classList.remove('error');
          this.saveButton.disabled = false;
          return of(value);
        })
      )

    fromEvent<MouseEvent>(this.saveButton, 'click')
      .pipe(
        withLatestFrom(this.valueSequence$),
      )
      .subscribe(console.log)
  }
}