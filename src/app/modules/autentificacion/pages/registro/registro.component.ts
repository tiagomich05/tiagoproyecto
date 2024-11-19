import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
// Servicio de autentificacion
import { AuthService } from '../../services/auth.service';
//Servicio de rutas que otorga Angular
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
//Importamos paqueteria de SweetAlert para alertas personalizadas
import Swal from 'sweetalert2';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  hide = true;

//IMPORTACION DEL MODELO / INTERFAZ
usuarios:Usuario= {
  uid:'',
  nombre:'',
  apellido:'',
  email:'',
  rol:'usuario',
  password:'',
}

//CREAR UNA COLECCION PARA USUARIOS
coleccionUsuarios:Usuario[] = [];

//Eeferenciamos a nuestros servicios
constructor(
  public servicioAuth: AuthService,
  public servicioRutas: Router,
  public serviciofirestore: FirestoreService
){
}

//FUNCION PARA EL REGISTRO
async registrar(){
  //credenciales = informacion que ingrese el usuario

  //const credenciales = {
    //uid:this.usuarios.uid,
    //nombre:this.usuarios.nombre,
    //apellido:this.usuarios.apellido,
    //email:this.usuarios.email,
    //rol:this.usuarios.rol,
    //password:this.usuarios.password,
  const credenciales = {
    email: this.usuarios.email,
    password: this.usuarios.password
  }

  
  //constante "respue" = resgarda una respuesta
  const respue = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
  //encapsula la respuesta anterior
  .then(res => {
    Swal.fire({
      title: "buen trabajo!",
      text: "Se pudo registrar con exito!",
      icon: "success"
    });

    //accedemos al servicio de rutas -> metodo navigate
    //metodo NAVIGATE = permite dirigirnos a diferentes vistas
    this.servicioRutas.navigate(['/inicio']);
  })
  //El metodo CATCH toma una falla y la vuelve un ERROR
  .catch(error => {
    Swal.fire({
      title: "ohh no!",
      text: "Hubo un problema al registrar el nuevo usuario!",
      icon: "error"
    });
  })

  const uid = await this.servicioAuth.obtenerUid();
this.usuarios.uid = uid;


  this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();
    // enviamos los nuevos registros por medio del metodo push a la coleccion
    //this.coleccionUsuarios.push(credenciales);
    //console.log(credenciales)
this.guardarusuario();
this.limpiarInputs();
}
async guardarusuario(){
  this.serviciofirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
  .then(res=>{console.log(this.usuarios)})
  .catch(error=>{console.log('error'+error)})
}
   limpiarInputs(){
    const inputs = {
      uid:this.usuarios.uid = '',
      nombre:this.usuarios.nombre = '',
      apellido:this.usuarios.apellido = '',
      email:this.usuarios.email = '',
      rol:this.usuarios.rol = 'vis',
      password:this.usuarios.password = '',
    }
   }


}
