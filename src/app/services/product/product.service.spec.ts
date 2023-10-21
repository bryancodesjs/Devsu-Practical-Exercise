import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ProductService', () => {
  let productService: ProductService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    productService = TestBed.inject(ProductService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should fetch all products', () => {
    const products = [{ id: 1 }, { id: 2 }];
    productService.getAllProducts().subscribe((response) => {
      expect(response).toBe(products);
    });
  });

  it('should fetch a single product', () => {
    const product = { id: 'tarj1' };
    productService.getProductById(product.id).subscribe((response) => {
      expect(response).toBe(product);
    });
  });

  it('should update the referenced product', () => {
    const product = { id: 'tarj1' };
    productService.updateProduct(product).subscribe((response) => {
      expect(response).toBe(product);
    });
  });

  it('should add a new product', () => {
    const product = { id: 'tarj1' };
    productService.addNewProduct(product).subscribe((response) => {
      expect(response).toBe(product);
    });
  });

  it('should delete the referenced product', () => {
    const product = { id: 'tarj1' };
    productService.deleteProduct(product.id).subscribe((response) => {
      expect(response).toBe(product);
    });
  });
});
