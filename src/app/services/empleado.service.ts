import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) {}

  agregarEmpleadoFirebase(data: Empleado): Promise<any> {
    return this.firestore.collection('empleados').add(data);
  }
}
