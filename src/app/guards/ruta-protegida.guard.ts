import { CanActivateFn } from '@angular/router';



import { inject, Inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';

import { Router } from '@angular/router';

import { map, switchMap, of, from } from 'rxjs';

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {

  const servicioAuth = inject(AuthService);

  const servicioRutas = inject(Router);

  const rolEsperado = "admin";


  return from(servicioAuth.obtenerUid()).pipe(
    switchMap(uid => {
      if (uid) {
        return servicioAuth.obtenerRol(uid).pipe(
          map(rol => {
            if (rol === rolEsperado) {
              //si coincide el rol esperado, habilita acceso al usuario
              console.log("usuario verificado como administrador");
              return true
            } else {
              //caso contrario deniega acceso
              return false
            }
          })
        )
      } else {
        console.log("usuario no validado. permisos insuficientes");


        //redirecciona a inicio para usuarios no validados o sin permisos de admin
        return of(servicioRutas.createUrlTree(["/inicio"]))
      }
    })
  )
};
