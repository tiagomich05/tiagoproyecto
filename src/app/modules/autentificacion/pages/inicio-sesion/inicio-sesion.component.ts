import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  ) {
  }

  //CREAR UNA COLECCION PARA USUARIOS
  coleccionUsuarios: Usuario[] = [];

  //FUNCION PARA EL REGISTRO
  async iniciaresion() {
    const credenciales = {
      email: this.usuarios.email,
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

      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          Swal.fire({
            text: "se ha loguedo con exito",
            icon: "success"
          })

          this.servicioAuth.enviarRolUsuario(usuariodata.rol);
          if (usuariodata.rol === "admin") {
            console.log("inicio de secion de usuario administrador")

            this.servicioRutas.navigate(['/admin'])
          } else {
            console.log("inicio de sesion de usuario visitante")
            this.servicioRutas.navigate(['/inicio'])
          }
        })
        .catch(err => {
          Swal.fire({
            text:"hubo un problema al iniciar sesion" + err,
            icon:"error"
          })
          this.limpiarInputs();
        })



    } catch (error){
      this.limpiarInputs()
    }
  }

  limpiarInputs() {
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = '',
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
