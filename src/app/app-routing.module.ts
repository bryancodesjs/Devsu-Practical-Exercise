import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/views/productos/productos.component';
import { AgregarComponent } from './components/views/agregar/agregar.component';
import { EditarComponent } from './components/views/editar/editar.component';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'editar/:id', component: EditarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
