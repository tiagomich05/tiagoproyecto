import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//vistas del modulo
import { ProductoComponent } from './pages/producto/producto.component';
import { CardComponent } from './components/card/card.component';
import { BuzoaComponent } from './pages/buzoa/buzoa.component';
import { CamperonesComponent } from './pages/camperones/camperones.component';
import { PantalonesComponent } from './pages/pantalones/pantalones.component';
import { RemerasComponent } from './pages/remeras/remeras.component';
import { CardRemerasComponent } from './components/card-remeras/card-remeras.component';
import { CardCamperonesComponent } from './components/card-camperones/card-camperones.component';
import { CardBuzoaComponent } from './components/card-buzoa/card-buzoa.component';
import { CardPantalonesComponent } from './components/card-pantalones/card-pantalones.component';


@NgModule({
  declarations: [
    ProductoComponent,
    CardComponent,
    BuzoaComponent,
    CamperonesComponent,
    PantalonesComponent,
    RemerasComponent,
    CardRemerasComponent,
    CardCamperonesComponent,
    CardBuzoaComponent,
    CardPantalonesComponent,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[
    ProductoComponent,
    CamperonesComponent,
    CardComponent,
    BuzoaComponent,
    PantalonesComponent,
    RemerasComponent,
    FormsModule, 
    ReactiveFormsModule

  ]
})
export class ProductoModule { }
