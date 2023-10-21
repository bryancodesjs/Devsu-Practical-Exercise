import { TestBed } from '@angular/core/testing';

import { FormularioProductoComponent } from './formulario-producto.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('FormularioProductoComponent', () => {
  let formularioProductoComponent: FormularioProductoComponent;
  let formBuilder: FormBuilder;
  let http: HttpClient;
  let httpController: HttpTestingController;
  let commonModule: CommonModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, CommonModule],
      providers: [FormularioProductoComponent],
    });

    formularioProductoComponent = TestBed.inject(FormularioProductoComponent);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    spyOn(formularioProductoComponent, 'assignDefaultDateIfCreating');
    spyOn(formularioProductoComponent, 'assignProductForEditing');
    spyOn(formularioProductoComponent, 'calcFechaRevision');
    spyOn(formularioProductoComponent, 'isReleaseDateValid');
  });

  it('should create', () => {
    expect(formularioProductoComponent).toBeTruthy();
  });

  it('should receive and store an action string', () => {
    formularioProductoComponent.accion = 'agregar';
    expect(formularioProductoComponent.accion).toEqual('agregar');
  });

  it('should receive and store a product object', () => {
    const incomingProduct = {
      id: 'someId',
      name: 'someName',
      description: 'someDescription',
      logo: 'someLogo.webp',
      date_release: '2023-11-10T00:00:00.000+00:00',
      date_revision: '202-11-10T00:00:00.000+00:00',
    };
    formularioProductoComponent.producto = incomingProduct;
    expect(formularioProductoComponent.producto).toEqual(incomingProduct);
  });

  it('should assign a default release date if user is adding a new product', () => {
    formularioProductoComponent.accion = 'agregar';
    formularioProductoComponent.assignDefaultDateIfCreating();
    expect(
      formularioProductoComponent.assignDefaultDateIfCreating
    ).toHaveBeenCalled();
  });

  it('should assign a revision date 1 year after the selected release date', () => {
    const fixture = TestBed.createComponent(FormularioProductoComponent);
    const component = fixture.componentInstance;
    const productoForm = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', []),
      description: new FormControl('', []),
      logo: new FormControl('', []),
      date_release: new FormControl('', []),
      date_revision: new FormControl('', []),
    });

    component.productoForm = productoForm;
    component.productoForm.controls['date_release'].setValue('2021-11-10');
    component.calcFechaRevision();
    expect(component.productoForm.controls['date_revision'].value).toEqual(
      '2022-11-10'
    );
  });
  it('should not submit the form if any field is invalid', () => {
    const fixture = TestBed.createComponent(FormularioProductoComponent);
    const component = fixture.componentInstance;
    const productoForm = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl('', Validators.required), //image url
      date_release: new FormControl('', Validators.required), //equal or greater than today
      date_revision: new FormControl('', Validators.required), //1 year after release date
    });

    component.productoForm = productoForm;
    component.formIsInvalid;
    component.submit();
    expect(component.formIsInvalid).toBeTrue();
  });

  it('should submit the form if all fields are valid', () => {
    const fixture = TestBed.createComponent(FormularioProductoComponent);
    const component = fixture.componentInstance;
    const productoForm = new FormGroup({
      id: new FormControl('tarj3', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      name: new FormControl('some name', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl('lorem ipsum dolor sit amet', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl('some logo url.webp', Validators.required), //image url
      date_release: new FormControl(
        '2023-11-10T00:00:00.000+00:00',
        Validators.required
      ), //equal or greater than today
      date_revision: new FormControl(
        '2024-11-10T00:00:00.000+00:00',
        Validators.required
      ), //1 year after release date
    });

    component.productoForm = productoForm;
    component.formIsInvalid;
    component.submit();
    expect(component.formIsInvalid).toBeFalse();
  });

  it('should reset the form with the originally passed product data if the user is editing a product', () => {
    const fixture = TestBed.createComponent(FormularioProductoComponent);
    const component = fixture.componentInstance;
    const productoForm = new FormGroup({
      id: new FormControl('tarj3', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      name: new FormControl('some name', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl('lorem ipsum dolor sit amet', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl('some logo url.webp', Validators.required), //image url
      date_release: new FormControl(
        '2023-11-10T00:00:00.000+00:00',
        Validators.required
      ), //equal or greater than today
      date_revision: new FormControl(
        '2024-11-10T00:00:00.000+00:00',
        Validators.required
      ), //1 year after release date
    });
    const producto = {
      id: 'tarj3',
      name: 'some name',
      description: 'lorem ipsum dolor sit amet',
      logo: 'some logo url.webp',
      date_release: '2023-11-10T00:00:00.000+00:00',
      date_revision: '2024-11-10T00:00:00.000+00:00',
    };
    const event = {
      preventDefault() {},
      target: { value: 'tarj3' },
    };
    component.productoForm = productoForm;
    component.producto = producto;
    component.accion = 'editar';
    component.resetForm(event);
    expect(component.productoForm.controls['id'].value).toEqual('tarj3');
    expect(component.productoForm.controls['name'].value).toEqual('some name');
    expect(component.productoForm.controls['description'].value).toEqual(
      'lorem ipsum dolor sit amet'
    );
    expect(component.productoForm.controls['logo'].value).toEqual(
      'some logo url.webp'
    );
    expect(component.productoForm.controls['date_release'].value).toEqual(
      '2023-11-10'
    );
    expect(component.productoForm.controls['date_revision'].value).toEqual(
      '2024-11-10'
    );
  });

  it('should trigger the isReleaseDateValid() function when the release date field is changed', () => {
    const fixture = TestBed.createComponent(FormularioProductoComponent);
    const component = fixture.componentInstance;
    const input = fixture.nativeElement.querySelector('#dateReleaseInput');
    const spy = spyOn(component, 'isReleaseDateValid');
    input.value = '2023-12-12';
    input.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalled();
  });

  it('should trigger the resetForm() function when the reset button is clicked', () => {
    const fixture = TestBed.createComponent(FormularioProductoComponent);
    const component = fixture.componentInstance;
    const spy = spyOn(component, 'resetForm');

    const button = fixture.nativeElement.querySelector('#reiniciarBtn');
    expect(button).toBeTruthy();
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });
});
