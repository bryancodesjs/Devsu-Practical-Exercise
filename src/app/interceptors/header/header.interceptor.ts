import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store/store.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private _store: StoreService) {}
  authorId = this._store.getAuthorId();

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = request.clone({
      headers: request.headers.set('authorId', `${this.authorId}`),
    });
    return next.handle(headers);
  }
}
