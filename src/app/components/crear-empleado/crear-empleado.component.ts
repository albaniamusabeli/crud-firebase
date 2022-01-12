import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {

  botonAgregar: boolean = false;
  loading: string = 'desactivado';
  

  constructor(private fb: FormBuilder,
              private empleadoService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  //Formulario Reactivo para Agregar Empleado
  formularioEmpleado = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]],
    apellido: ['',[Validators.required, Validators.minLength(3)]],
    rut: ['',[Validators.required, Validators.minLength(8)]],
    sueldo: ['',[Validators.required, Validators.min(150000)]]
    
  })

  //metodo para el formulario
  agregarEmpleado(){
    this.botonAgregar = true;

    //console.log(this.formularioEmpleado.value);
    if (this.formularioEmpleado.invalid) {
      return;
    }

    //En este punto, el formulario es valido
    const empleado: Empleado ={
      nombre: this.formularioEmpleado.value.nombre,
      apellido: this.formularioEmpleado.value.apellido,
      rut: this.formularioEmpleado.value.rut,
      sueldo: this.formularioEmpleado.value.sueldo,

      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading= 'activado';

    this.empleadoService.agregarEmpleadoFirebase(empleado).then(()=>{
      this.toastr.success('Empleado Agregado Correctamente', 'Empleado Registrado!',{positionClass: 'toast-bottom-right'});
      
      this.loading= 'desactivado';
      
      this.router.navigate(['/lista-empleados']);
      
    }).catch( error =>{
      console.log('Error: ',error);
      
      
    } )
    
  }
}
