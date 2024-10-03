import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobrenosotrosRoutingModule } from './sobrenosotros-routing.module';
import { ComponentsComponent } from './components/components.component';


@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    SobrenosotrosRoutingModule
    
  ]
})
export class SobrenosotrosModule { }












