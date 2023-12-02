import { Subject, BehaviorSubject, ReplaySubject } from "rxjs";

class DataSerivce {
  // private constorSequence$$ = new Subject();
  // private constorSequence$$ = new BehaviorSubject({});
  private constorSequence$$ = new ReplaySubject(2);

  public getData() {
    return this.constorSequence$$.asObservable();
  }

  public sendData(data: any) {
    this.constorSequence$$.next(data);
  }
}

export const instance = new DataSerivce();