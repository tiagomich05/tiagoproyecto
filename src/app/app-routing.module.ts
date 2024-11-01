import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';
import { rutaProtegidaGuard } from './guards/ruta-protegida.guard'

//son las encargadas de tener todas las rutas de la pagina
const routes: Routes = [
  //ruta comun -> 1 solo componente
{
  path:"",component:InicioComponent
},
//carga perezosa -> 1 modulo
//loadchildren: indica una ruta hija 
// ()=> import: ruta de donde viene el modulo
//.then promesa/ funcion asincronica

{
  path:"",loadChildren:()=> import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
},
{
  path:"",loadChildren:()=> import('./modules/producto/producto.module'). then(m=>m.ProductoModule)
},
{
  path:"",loadChildren:()=> import('./modules/autentificacion/autentificacion.module'). then(m=>m.AutentificacionModule)
},
{
  path:"", loadChildren:()=> import('./modules/admin/admin.module').then(m=>m.AdminModule),
  //especificamos que la ruta de administrador va a ser protegida con un guardian
  //y espera un rol de tipo "admin"
  canActivate:[rutaProtegidaGuard], data: {role: 'admin'}
},
{
  path:"", loadChildren:()=> import('./modules/sobrenosotros/sobrenosotros.module').then(m=>m.SobrenosotrosModule)
},

{
  path:"", loadChildren:()=> import('./modules/contacto/contacto.module').then(m=>m.ContactoModule)
   
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
