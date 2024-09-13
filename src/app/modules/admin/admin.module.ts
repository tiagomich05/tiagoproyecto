import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//archivo de rutas del modulo
import { AdminRoutingModule } from './admin-routing.module';
//componente de vista
import { AdminComponent } from './pages/admin/admin.component';
//componente local
import { TableComponent } from './components/table/table.component';
//Componente de material
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminComponent,
    TableComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
