import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public _authorId = '3';

  constructor() {}

  public getAuthorId() {
    return this._authorId;
  }
}
