import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.scss']
})
export class ListaEmpleadosComponent implements OnInit {

  //Lista de empleados que guarda los empleados que se trae de firebase
  empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService,
              private toastr: ToastrService) {
   
  }

  ngOnInit(): void {
    this.getEmpleados()
  }


  getEmpleados(){
    this.empleadoService.obtenerEmpleadosFirebase().subscribe(data =>{
      
      this.empleados = [];

      data.forEach((i:any) => {
        //console.log(i.payload.doc.id);
        //console.log(i.payload.doc.data());
        this.empleados.push({
          id: i.payload.doc.id,
          ...i.payload.doc.data()
        })
        
      });
      console.log(this.empleados);
      
    })
  }


  eliminarEmpleado(id: any){
    this.empleadoService.eliminarEmpleadoFirebase(id).then(()=>{
      this.toastr.error('Empleado Eliminado de la base de datos', 'Empleado Eliminado',{positionClass: 'toast-bottom-right'});
    })
    .catch(error =>{
      console.log(error);
    })
  }
}
