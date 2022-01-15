import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) {}

  agregarEmpleadoFirebase(data: Empleado): Promise<any> {
    return this.firestore.collection('empleados').add(data);
  }

  //obtener todos los empleados (snapshotChanges: cambios en tiempo real)
  obtenerEmpleadosFirebase(): Observable<any> {
    return this.firestore.collection('empleados',ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  //obtener empleado de firebase segun su id
  obtenerEmpleadoFirebase(idRuta: string): Observable<any> {
    return this.firestore.collection('empleados').doc(idRuta).snapshotChanges();
  }

  //metodo para editar empleado (recibe el id y los datos de empleado)
  editarEmpleadoFirebase(id: string, empleado: Empleado): Promise<any> {
    return this.firestore.collection('empleados').doc(id).update(empleado);
  }


  //metodo para eliminar empleado de Firebase
  eliminarEmpleadoFirebase(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }
}
