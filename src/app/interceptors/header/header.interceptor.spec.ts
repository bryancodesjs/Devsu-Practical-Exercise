import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HeaderInterceptor } from './header.interceptor';
import { StoreService } from 'src/app/services/store/store.service';
import { Observable, of } from 'rxjs';

class MockStoreService {
  getAuthorId() {
    return '369';
  }
}
describe('HeaderInterceptor', () => {
  let headerInterceptor: HeaderInterceptor;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeaderInterceptor,
        { provide: StoreService, useClass: MockStoreService },
      ],
    });

    headerInterceptor = TestBed.inject(HeaderInterceptor);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(headerInterceptor).toBeTruthy();
  });

  it('should intercept any http request', () => {
    const headerInterceptor: HeaderInterceptor =
      TestBed.inject(HeaderInterceptor);
    const mockHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> =>
        of(new HttpResponse(req)),
    };
    const spy = spyOn(mockHandler, 'handle').and.callThrough();
    http.get('/bp/products').subscribe();
    headerInterceptor
      .intercept(new HttpRequest('GET', '/bp/products'), mockHandler)
      .subscribe();
    expect(spy).toHaveBeenCalled();
  });
});
