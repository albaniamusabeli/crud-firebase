import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  titulo: string = 'Agregar Empleado';
  
  // id en la ruta, para editar un usuario de la lista
  idRuta: string | null = '';

  constructor(private fb: FormBuilder,
              private empleadoService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idRuta = this.activatedRoute.snapshot.paramMap.get('id');
    this.esEditar();
  }

  //Formulario Reactivo para Agregar Empleado
  formularioEmpleado = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]],
    apellido: ['',[Validators.required, Validators.minLength(3)]],
    rut: ['',[Validators.required, Validators.minLength(8)]],
    sueldo: ['',[Validators.required, Validators.min(150000)]]
    
  })

  //metodo para el formulario
  agregarEditar(){
    this.botonAgregar = true;

    //console.log(this.formularioEmpleado.value);
    if (this.formularioEmpleado.invalid) {
      return;
    }

    if (this.idRuta === null){
      this.agregarEmpleado();
    }
    else{
      this.editarEmpleado(this.idRuta);
    }
  }


  agregarEmpleado(){
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


  editarEmpleado(id: string){
    this.loading = 'activado';

    const empleado: Empleado ={

      nombre: this.formularioEmpleado.value.nombre,
      apellido: this.formularioEmpleado.value.apellido,
      rut: this.formularioEmpleado.value.rut,
      sueldo: this.formularioEmpleado.value.sueldo,

      fechaActualizacion: new Date()
    }

    this.empleadoService.editarEmpleadoFirebase(id, empleado).then( ()=>{
      this.loading= 'desactivado';

      this.toastr.info('Datos Actualizados', 'Listo',{positionClass: 'toast-bottom-right'});
      
      this.router.navigate(['/lista-empleados']);
      
    } )
  }

  //Comprobar si en la ruta hay un ID de empleado
  esEditar(){
    if (this.idRuta !== null) {
      this.titulo = 'Editar Empleado';
      this.loading = 'activado';
      this.empleadoService.obtenerEmpleadoFirebase(this.idRuta).subscribe(empleado=>{
        this.loading = 'desactivado';
        //Rellenando el formulario reactivo con lso datos de firebase
        this.formularioEmpleado.setValue({
          nombre: empleado.payload.data()['nombre'],
          apellido: empleado.payload.data()['apellido'],
          rut: empleado.payload.data()['rut'],
          sueldo: empleado.payload.data()['sueldo']
        })
      })
    }
  }

}
