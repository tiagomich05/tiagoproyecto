import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';

import { InicioComponent } from './pages/inicio/inicio.component';

import { CardComponent } from './components/card/card.component';

//componentes que importamos desde material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    InicioComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
  ],
})
export class InicioModule { }
