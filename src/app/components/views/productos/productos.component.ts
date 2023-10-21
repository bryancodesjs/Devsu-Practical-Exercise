import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  constructor(private _product: ProductService, private _router: Router) {}

  //pagination variables
  itemsPerPage: number = 5;
  currentPage: number = 1;

  ngOnInit(): void {
    this.getAllProducts();
  }

  products: any[] = [];
  productsOriginalData: any[] = []; //se almacena una copia original del listado de prod. para poder filtrar
  getAllProducts() {
    //reset products array
    this.products = [];
    this.productsOriginalData = [];

    this._product.getAllProducts().subscribe((products) => {
      this.products = products;
      this.productsOriginalData = products;
    });
  }

  filtrarPorNombre(event: any) {
    const nombre = event.target.value.toLowerCase();
    this.products = this.productsOriginalData.filter((product) => {
      return product.name.toLowerCase().includes(nombre);
    });

    //reiniciar paginacion en caso de tener resultados
    if (this.products.length > 0) {
      this.currentPage = 1;
    }
  }

  editarProducto(idProducto: string) {
    this._router.navigate(['/editar', idProducto]);
  }

  productForDelete: any = {};
  deleteProduct(producto: object) {
    this.productForDelete = producto;
    this.showModal();
  }

  confirmDelete() {
    this._product.deleteProduct(this.productForDelete.id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        if (err.status === 200) {
          this.closeModal();
          this.getAllProducts();
        }
      }
    );
  }

  showingModal: boolean = false;
  closeModal() {
    this.showingModal = false;
  }

  showModal() {
    this.showingModal = true;
  }

  canMoveToNextPage() {
    const nextPage = this.currentPage;
    const productsViewed = nextPage * this.itemsPerPage;
    const productsLeft = this.products.length - productsViewed;
    return productsLeft > 0;
  }

  nextPage() {
    if (this.canMoveToNextPage()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage == 1) {
      return;
    }
    this.currentPage--;
  }

  changeItemsPerPage(event: any) {
    this.itemsPerPage = event.target.value;
  }
}
