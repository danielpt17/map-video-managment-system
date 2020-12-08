import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class HomeService {

  private readonly shouldFocusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shouldFocusObservable: Observable<boolean> = this.shouldFocusSubject.asObservable();


  public setFocusSubject(shouldFocus: boolean): void {
    this.shouldFocusSubject.next(shouldFocus);
  }
}
