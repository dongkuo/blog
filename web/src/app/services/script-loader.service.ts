import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/delay";

@Injectable()
export class ScriptLoaderService {

  private scripts = new Map<string,Observable<boolean>|boolean>();

  constructor() {
  }

  public load(src: string, isAsync = false, delay = 0): Observable<boolean> {
    if (this.scripts.has(src)) {
      // If script has already been fully loaded.
      if (this.scripts.get(src) === true) return Observable.of(true).delay(delay);
      // Else if download is already underway but load event hasn't fired yet
      else return this.scripts.get(src) as Observable<boolean>;
    }
    let script = document.createElement('script');
    document.body.appendChild(script);
    let obs: Observable<boolean> = Observable.fromEvent(script, 'load')
      .do(() => this.scripts.set(src, true))
      .take(1)
      .map(e => true);
    script.src = src;
    if (isAsync) {
      script.setAttribute('async', 'async');
    }
    this.scripts.set(src, obs);
    return obs;
  }
}
