import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  PRODUCTS_PATH = '/bp/products';

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}` + this.PRODUCTS_PATH);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.API_URL}` + this.PRODUCTS_PATH + '?id=' + productId
    );
  }

  updateProduct(productJSON: any): Observable<any> {
    return this.http.put<any>(
      `${environment.API_URL}` + this.PRODUCTS_PATH,
      productJSON
    );
  }

  addNewProduct(productJSON: any): Observable<any> {
    return this.http.post<any>(
      `${environment.API_URL}` + this.PRODUCTS_PATH,
      productJSON
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.API_URL}` + this.PRODUCTS_PATH + '?id=' + productId
    );
  }
}
