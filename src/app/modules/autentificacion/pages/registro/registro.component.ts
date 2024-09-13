import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
// Servicio de autentificacion
import { AuthService } from '../../services/auth.service';
//Servicio de rutas que otorga Angular
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
//Importamos paqueteria de SweetAlert para alertas personalizadas
import Swal from 'sweetalert2';


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
  rol:'',
  password:'',
}

//CREAR UNA COLECCION PARA USUARIOS
coleccionUsuarios:Usuario[] = [];

//Eeferenciamos a nuestros servicios
constructor(
  public servicioAuth: AuthService,
  public servicioRutas: Router
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

  this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();
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

    // enviamos los nuevos registros por medio del metodo push a la coleccion
    //this.coleccionUsuarios.push(credenciales);
    //console.log(credenciales)
//
}
   limpiarInputs(){
    const inputs = {
      uid:this.usuarios.uid = '',
      nombre:this.usuarios.nombre = '',
      apellido:this.usuarios.apellido = '',
      email:this.usuarios.email = '',
      rol:this.usuarios.rol = '',
      password:this.usuarios.password = '',
    }
   }


}
