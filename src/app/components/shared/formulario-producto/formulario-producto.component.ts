import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss'],
})
export class FormularioProductoComponent implements OnInit {
  @Input() producto: any = {};
  @Input() accion: string = 'agregar' || 'editar'; // 'agregar' | 'editar'
  today: Date = new Date();
  productoCopy: any = {};
  constructor(private _product: ProductService, private _router: Router) {}

  ngOnInit(): void {
    this.assignProductForEditing();
    this.assignDefaultDateIfCreating();
  }

  assignDefaultDateIfCreating() {
    if (this.accion == 'agregar') {
      this.productoForm.controls['date_release'].setValue(
        this.today.toISOString().split('T')[0]
      );
    }
  }

  assignProductForEditing() {
    if (this.accion == 'editar') {
      this.productoForm.controls['id'].setValue(this.producto.id);
      // this.productoForm.controls['id'].disable();
      this.productoForm.controls['name'].setValue(this.producto.name);
      this.productoForm.controls['description'].setValue(
        this.producto.description
      );
      this.productoForm.controls['logo'].setValue(this.producto.logo);
      const releaseDate = new Date(this.producto.date_release);
      this.productoForm.controls['date_release'].setValue(
        releaseDate.toISOString().split('T')[0]
      );

      const revisionDate = new Date(this.producto.date_revision);
      this.productoForm.controls['date_revision'].setValue(
        revisionDate.toISOString().split('T')[0]
      );
    }
  }
  productoForm = new FormGroup({
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

  resetForm(event: any): void {
    //prevenir que el formulario se envie al hacer click en 'Reiniciar'
    event.preventDefault();

    if (this.accion == 'editar') {
      this.productoForm.reset();
      this.assignProductForEditing();
    } else {
      this.productoForm.reset();
    }
  }

  releaseDateIsValid = true;
  isReleaseDateValid() {
    const date = this.productoForm.controls['date_release'].value;

    if (date) {
      const selectedDate = new Date(date);
      const currentDate = new Date();

      selectedDate.setHours(0, 0, 0, 0);
      selectedDate.setDate(selectedDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);

      //validate that selected date is greater or equal than current date
      if (
        selectedDate.toDateString() == currentDate.toDateString() ||
        selectedDate > currentDate
      ) {
        this.releaseDateIsValid = true;
        this.calcFechaRevision();
      } else {
        this.releaseDateIsValid = false;
      }
    }
  }

  calcFechaRevision() {
    //debe ser 365 dias despues de la fecha de lanzamiento
    const defaultDate = new Date();
    const date =
      this.productoForm.controls['date_release'].value || defaultDate;
    const selectedDate = new Date(date);
    const revisionDate = new Date(
      selectedDate.setFullYear(selectedDate.getFullYear() + 1)
    );
    this.productoForm.controls['date_revision'].setValue(
      revisionDate.toISOString().split('T')[0]
    );
    // if (date) {
    // }
  }

  formIsInvalid: boolean = false;
  //someter formulario
  submit(): void {
    this.isReleaseDateValid();
    if (!this.productoForm.valid || !this.releaseDateIsValid) {
      //stop execution if form isn't valid
      this.formIsInvalid = true;
      return;
    } else {
      this.formIsInvalid = false;
    }
    // console.log(this.productoForm.valid);
    if (this.accion == 'agregar') {
      this._product.addNewProduct(this.productoForm.value).subscribe(
        (res) => {
          this._router.navigate(['/']);
        },
        (error) => console.log(error)
      );
    } else if (this.accion == 'editar') {
      console.log(this.productoForm.value);
      this._product.updateProduct(this.productoForm.value).subscribe(
        (res) => {
          this._router.navigate(['/']);
        },
        (error) => console.log(error)
      );
    }
  }
}
