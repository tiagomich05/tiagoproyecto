import { Injectable } from '@angular/core';

//Servicio de AUTENTIFICACION DE FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Referenciar auth de firebase para iniciarlo
  constructor(public auth: AngularFireAuth, private servicioFireStore:AngularFirestore) { }

  //Funcion para tomar UID

  //Funcion para REGISTRO

  registrar (email:string, password: string){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }
  //Funcion para INICIO DE SESION

  iniciarSesion(email:string, password:string){
    //valiadr el email y la contraseña
    return this.auth.signInWithEmailAndPassword(email,password);
  }
  //Funcion para CERRAR SESION
  cerrarSesion(){
    //Devolver una promesa vacia
    return this.auth.signOut();
  }

  obtenerUsuario(email:string){
    return this.servicioFireStore.collection('usuarios', ref => ref.where('email','==',email)).get().toPromise();
  }
}
