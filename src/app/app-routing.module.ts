import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';

const routes: Routes = [
  {path: '', redirectTo: 'lista-empleados', pathMatch: 'full'},
  {path: 'lista-empleados', component: ListaEmpleadosComponent},
  {path: 'crear-empleado', component: CrearEmpleadoComponent},
  {path: '**', redirectTo: 'lista-empleados', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
