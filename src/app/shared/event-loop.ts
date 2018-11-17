import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/* istanbul ignore next */
@Injectable({
  providedIn: 'root'
})
export class EventLoop {
  onNextTick(): Observable<void> {
    return Observable.create((observer: Subject<void>) => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      });
    });
  }
}
