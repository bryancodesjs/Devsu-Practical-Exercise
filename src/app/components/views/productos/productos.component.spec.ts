import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponent } from './productos.component';
import { ProductService } from 'src/app/services/product/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

//mock pipe para simular paginacion
@Pipe({ name: 'paginate' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

describe('ProductosComponent', () => {
  let productosComponent: ProductosComponent;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ProductosComponent, ProductService],
      declarations: [ProductosComponent],
    });

    productosComponent = TestBed.inject(ProductosComponent);
    productService = TestBed.inject(ProductService);

    spyOn(productosComponent, 'getAllProducts');
    spyOn(productosComponent, 'confirmDelete');
  });

  it('should create', () => {
    expect(productosComponent).toBeTruthy();
  });

  it('should fetch all products', () => {
    productosComponent.getAllProducts();
    expect(productosComponent.getAllProducts).toHaveBeenCalled();
  });

  it('should filter products by name', () => {
    const searchString = 'tar';
    const event = {
      target: {
        value: searchString,
      },
    };

    productosComponent.products = [
      { name: 'targeta gold' },
      { name: 'tarjeta black' },
      { name: 'cta de ahorros' },
    ];

    productosComponent.productsOriginalData = [
      { name: 'targeta gold' },
      { name: 'tarjeta black' },
      { name: 'cta de ahorros' },
    ];

    productosComponent.filtrarPorNombre(event);
    expect(productosComponent.products.length).toBe(2);
  });

  it('should return an empty array if no products match the  entered name', () => {
    const searchString = 'spacex';
    const event = {
      target: {
        value: searchString,
      },
    };

    productosComponent.products = [
      { name: 'targeta gold' },
      { name: 'tarjeta black' },
      { name: 'cta de ahorros' },
    ];

    productosComponent.productsOriginalData = [
      { name: 'targeta gold' },
      { name: 'tarjeta black' },
      { name: 'cta de ahorros' },
    ];

    productosComponent.filtrarPorNombre(event);
    expect(productosComponent.products.length).toBe(0);
  });

  it('should redirect to the edit page', () => {
    const spy = spyOn(TestBed.inject(Router), 'navigate');
    productosComponent.editarProducto('1');
    expect(spy).toHaveBeenCalledWith(['/editar', '1']);
  });

  it('should assign a product to delete', () => {
    const product = { id: '1' };
    productosComponent.deleteProduct(product);
    expect(productosComponent.productForDelete).toEqual(product);
  });

  it('should delete a product', () => {
    productosComponent.confirmDelete();
    expect(productosComponent.confirmDelete).toHaveBeenCalled();
  });

  it('should show the confirmation modal when clicking on the delete button', () => {
    const spy = spyOn(productosComponent, 'showModal');
    const product = { id: '1' };
    productosComponent.deleteProduct(product);
    expect(spy).toHaveBeenCalled();
  });

  it('should show the modal', () => {
    const spy = spyOn(productosComponent, 'showModal');
    productosComponent.showModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should close the modal', () => {
    productosComponent.closeModal();
    expect(productosComponent.showingModal).toBeFalse();
  });

  it('should return true if the user can move to the next pagination page', () => {
    productosComponent.currentPage = 1;
    productosComponent.itemsPerPage = 2;
    productosComponent.products = [
      { name: 'targeta gold' },
      { name: 'tarjeta black' },
      { name: 'cta de ahorros' },
    ];

    expect(productosComponent.canMoveToNextPage()).toBeTrue();
  });

  it('should return false if the user can not move to the next pagination page', () => {
    productosComponent.currentPage = 2;
    productosComponent.itemsPerPage = 2;
    productosComponent.products = [
      { name: 'targeta gold' },
      { name: 'tarjeta black' },
      { name: 'cta de ahorros' },
    ];

    expect(productosComponent.canMoveToNextPage()).toBeFalse();
  });

  it('should allow the user to move to previous pagination page if the current page is greater than 1', () => {
    productosComponent.currentPage = 2;
    productosComponent.previousPage();
    expect(productosComponent.currentPage).toBe(1);
  });

  it('should not allow the user to move to previous pagination page if the current page is 1', () => {
    productosComponent.currentPage = 1;
    productosComponent.previousPage();
    expect(productosComponent.currentPage).toBe(1);
  });

  it('should allow the user to change the amount of items shown per page', () => {
    const event = {
      target: {
        value: 5,
      },
    };
    productosComponent.itemsPerPage = 10;
    productosComponent.changeItemsPerPage(event);
    expect(productosComponent.itemsPerPage).toBe(5);
  });
});
