import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { PedidoComponent } from './components/pedido/pedido.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PedidoComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports:[
    MatIconModule,
    ReactiveFormsModule
  ]
})


export class CarritoModule { }
