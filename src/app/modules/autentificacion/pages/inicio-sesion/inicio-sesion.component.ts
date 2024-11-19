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

  // Constructor donde se inyectan los servicios necesarios: AuthService para la autenticación 
// y Router para la navegación entre rutas dentro de la aplicación.
constructor(
  public servicioAuth: AuthService, // Servicio de autenticación
  public servicioRutas: Router      // Servicio de navegación
) { }

// Colección de usuarios. Se utilizará para almacenar usuarios que están registrados en el sistema.
coleccionUsuarios: Usuario[] = [];

// Función para manejar el inicio de sesión del usuario.
async iniciaresion() {
// Crear objeto de credenciales con email y contraseña del usuario.
const credenciales = {
  email: this.usuarios.email,
  password: this.usuarios.password,
}

try {
  // Obtener los datos del usuario a través del servicio de autenticación utilizando el email proporcionado.
  const usuario8D = await this.servicioAuth.obtenerUsuario(credenciales.email);

  // Si el usuario no existe o el correo no está registrado, se muestra un mensaje y se limpian los inputs.
  if (!usuario8D || usuario8D.empty) {
    alert('El correo electronico no esta registrado.')
    this.limpiarInputs(); // Limpia los campos del formulario.
    return;
  }

  // Si el usuario existe, obtener el primer documento que contiene los datos del usuario.
  const usuarioDoc = usuario8D.docs[0];

  // Extraer los datos del usuario de Firestore y asignarlos a un objeto Usuario.
  const usuariodata = usuarioDoc.data() as Usuario;

  // Realizar un hash de la contraseña ingresada por el usuario para comparar con la almacenada en la base de datos.
  const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

  // Si las contraseñas no coinciden, se muestra un mensaje de error y se limpia el campo de la contraseña.
  if (hashedPassword !== usuariodata.password) {
    alert("Contraseña incorrecta");
    this.usuarios.password = ''; // Limpiar el campo de contraseña.
    return;
  }

  // Si las credenciales son correctas, intentar iniciar sesión a través del servicio de autenticación.
  const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
    .then(res => {
      // Mostrar un mensaje de éxito al usuario con un modal utilizando SweetAlert2.
      Swal.fire({
        text: "Se ha logueado con éxito",
        icon: "success"
      })

      // Enviar el rol del usuario al servicio de autenticación para su procesamiento posterior.
      this.servicioAuth.enviarRolUsuario(usuariodata.rol);

      // Si el usuario tiene el rol de 'admin', redirigirlo al panel de administración.
      if (usuariodata.rol === "admin") {
        console.log("Inicio de sesión de usuario administrador")
        this.servicioRutas.navigate(['/admin']); // Navegar a la ruta '/admin'.
      } else {
        // Si el usuario tiene un rol diferente, redirigirlo a la página principal de inicio.
        console.log("Inicio de sesión de usuario visitante")
        this.servicioRutas.navigate(['/inicio']); // Navegar a la ruta '/inicio'.
      }
    })
    .catch(err => {
      // Si ocurre un error durante el inicio de sesión, mostrar un mensaje de error.
      Swal.fire({
        text: "Hubo un problema al iniciar sesión: " + err,
        icon: "error"
      })
      // Limpiar los inputs del formulario en caso de error.
      this.limpiarInputs();
    })
} catch (error) {
  // Si ocurre un error en el bloque 'try', limpiar los inputs y manejar el error.
  this.limpiarInputs();
}
}

// Función para limpiar los campos del formulario después de un inicio de sesión fallido o exitoso.
limpiarInputs() {
// Se asignan valores vacíos a los campos del usuario para resetear el formulario.
const inputs = {
  uid: this.usuarios.uid = '',         // Limpiar UID del usuario.
  nombre: this.usuarios.nombre = '',   // Limpiar nombre.
  apellido: this.usuarios.apellido = '', // Limpiar apellido.
  email: this.usuarios.email = '',     // Limpiar email.
  rol: this.usuarios.rol = '',         // Limpiar rol.
  password: this.usuarios.password = '', // Limpiar contraseña.
}
}

 

}
