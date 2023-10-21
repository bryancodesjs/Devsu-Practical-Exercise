import { TestBed } from '@angular/core/testing';
import { EditarComponent } from './editar.component';
import { ProductService } from 'src/app/services/product/product.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditarComponent', () => {
  let editarComponent: EditarComponent;
  let http: HttpClient;
  let httpController: HttpTestingController;
  let activatedRoute: ActivatedRoute;
  let productService: ProductService;

  const fakeActivatedRoute = {
    snapshot: { id: '1' },
  } as unknown as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        EditarComponent,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    });

    editarComponent = TestBed.inject(EditarComponent);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);

    spyOn(editarComponent, 'getRouteParams');
  });

  it('should create', () => {
    expect(editarComponent).toBeTruthy();
  });

  it('should get route params', () => {
    editarComponent.getRouteParams();
    expect(editarComponent.getRouteParams).toHaveBeenCalled();
  });
});
