import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true;

  //IMPORTACION DEL MODELO / INTERFAZ
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
  }

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router
  ){
  }

  //CREAR UNA COLECCION PARA USUARIOS
  coleccionUsuarios: Usuario[] = [];

  //FUNCION PARA EL REGISTRO
  async registrar() {
    const credenciales = {
      uid: this.usuarios.uid,
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password,
    }

    try {
      const usuario8D = await this.servicioAuth.obtenerUsuario(credenciales.email);

      if (!usuario8D || usuario8D.empty) {
        alert('El correo electronico no esta registrado.')
        this.limpiarInputs();
        return;
      }

      const usuarioDoc = usuario8D.docs[0];

      const usuariodata = usuarioDoc.data() as Usuario;

      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      if (hashedPassword !== usuariodata.password) {
        alert("Contraseña incorrecta");
        this.usuarios.password = '';
        return;
      }

    } catch { }
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
//   for(let i = 0; i <this.coleccionUsuarios.length; i++) {
//   const usuario = this.coleccionUsuarios[i];
//   if (usuario.nombre === credenciales.nombre &&
//     usuario.apellido === credenciales.apellido &&
//     usuario.email === credenciales.email &&
//     usuario.rol === credenciales.rol &&
//     usuario.password === credenciales.password
//   ) {
//     alert("iniciaste sesion correctamente :)");
//     //paramos la funcion
//     break;
//   } else {
//     alert("no se pudo iniciar sesion:( ");
//     break;
//   }
// }
// // enviamos los nuevos registros por medio del metodo push a la coleccion
// this.coleccionUsuarios.push(credenciales);
// console.log(credenciales)

//   }

}
