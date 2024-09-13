import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { BuzoaComponent } from './pages/buzoa/buzoa.component';
import { CamperonesComponent } from './pages/camperones/camperones.component';
import { RemerasComponent } from './pages/remeras/remeras.component';
import { PantalonesComponent } from './pages/pantalones/pantalones.component';

const routes: Routes = [
  {
    path: "producto", component:ProductoComponent
  },
  {
    path: "buzoa", component:BuzoaComponent
  },
  {
    path: "camperones", component:CamperonesComponent
  },
  {
    path: "remeras", component:RemerasComponent
  },
  {
    path: "pantalones", component:PantalonesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
