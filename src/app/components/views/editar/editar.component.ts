import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _product: ProductService
  ) {}

  productId: string | null = null;
  product: any | null = null;
  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams() {
    //get id param from url
    this._activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this._product.getProductById(this.productId).subscribe((result) => {
          //aunque especifico un productId, el endpoint trae todos los productos
          //procedo a filtrar para simular la devolucion de un solo producto

          this.product = result.filter(
            (product: any) => product.id == this.productId
          )[0];
        });
      }
    });
  }
}
