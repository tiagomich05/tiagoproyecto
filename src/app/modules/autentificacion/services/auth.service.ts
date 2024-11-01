import { Injectable } from '@angular/core';

//Servicio de AUTENTIFICACION DE FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';

//obaserva los cambios
import { Observable } from 'rxjs';

//itera la coleccion leyendo su informacion actual
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolUsuario: string | null = null;
  //Referenciar auth de firebase para iniciarlo
  constructor(public auth: AngularFireAuth, private servicioFireStore: AngularFirestore) { }

  //Funcion para tomar UID
  async obtenerUid(){
    const user = await this.auth.currentUser;

    if(user == null) {
      return null;
    }else{
      return user.uid;
    }
  }

  //Funcion para REGISTRO

  registrar(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  //Funcion para INICIO DE SESION

  iniciarSesion(email: string, password: string) {
    //valiadr el email y la contraseña
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  //Funcion para CERRAR SESION
  cerrarSesion() {
    //Devolver una promesa vacia
    return this.auth.signOut();
  }

  obtenerUsuario(email: string) {
    return this.servicioFireStore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();
  }

  /*
  retornamos del servicio de firestore la coleccion de usuarios, buscamos por UID 
  observamos cambios en valores, mapeamos el documenti de 'usuario' e identificamos
  el atributo de rol (aun si es nulo)
  */
  obtenerRol(uid: string): Observable<string | null> {
    return this.servicioFireStore.collection('usuarios').doc(uid).valueChanges()
      .pipe(map((usuario: any) => usuario ? usuario.rol : null));
  }
  enviarRolUsuario(rol: string) {
    this.rolUsuario = rol;
  }

  obtenerRolUsuario(): string | null {
  return this.rolUsuario;
}
}
