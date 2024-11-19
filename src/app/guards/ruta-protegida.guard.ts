//importaciones
import { CanActivateFn } from '@angular/router';

import { inject, Inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';

import { Router } from '@angular/router';

import { map, switchMap, of, from } from 'rxjs';

// Se exporta una constante llamada 'rutaProtegidaGuard' que implementa CanActivateFn
// 'CanActivateFn' es una función de guard que se utiliza para proteger rutas de la aplicación
export const rutaProtegidaGuard: CanActivateFn = (route, state) => {

  // Inyección un servicio para la autentificacion 
  const servicioAuth = inject(AuthService);  // Servicio de autenticación para obtener el UID y el rol del usuario
  const servicioRutas = inject(Router);  // Servicio de rutas para redirigir a los usuarios
  const rolEsperado = "admin";  // Definimos el rol que esperamos para acceder a esta ruta (en este caso 'admin')

  // Se obtiene el UID del usuario actual utilizando el servicio de autenticación
  //from convierte la promesa en un flujo de datos.
  // .pipe enlaza funciones de manera legible
  return from(servicioAuth.obtenerUid()).pipe(
    // Utilizamos 'switchMap' para hacer una nueva solicitud una vez obtenido el UID
    //switchmap se utiliza para proyectar cada valor a un observable interno
    switchMap(uid => {
      //si es verdadera pasa esto(if) Si es falso pasa esto (else)
      if (uid) {
        // Si el UID es válido (es decir, el usuario está autenticado), verificamos su rol
        return servicioAuth.obtenerRol(uid).pipe(
          map(rol => {
            // Si el rol del usuario es el esperado (en este caso, 'admin'), permitimos el acceso
            if (rol === rolEsperado) {
              console.log("usuario verificado como administrador"); // Mensaje de depuración en consola
              return true; // Retornamos 'true' para permitir el acceso a la ruta
            } else {
              // Si el rol no es el esperado, denegamos el acceso
              return false; // Retornamos 'false' para bloquear el acceso
            }
          })
        );
      } else {
        // Si el UID es nulo (usuario no autenticado), denegamos el acceso
        console.log("usuario no validado. permisos insuficientes");  // Mensaje de depuración

        // Redirigimos al usuario a la página de inicio ('/inicio') si no está autenticado o no tiene permisos suficientes
        return of(servicioRutas.createUrlTree(["/inicio"])); // Retornamos un observable con la nueva URL para redirigir
      }
    })
  );
};