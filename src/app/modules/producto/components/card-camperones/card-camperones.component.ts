import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-camperones',
  templateUrl: './card-camperones.component.html',
  styleUrls: ['./card-camperones.component.css']
})
export class CardCamperonesComponent {


  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  
  coleccionCamperones: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
      this.mostrarProductoCamperones();

    })
   
  }

  
  mostrarProductoCamperones(){
    
    this.coleccionProductos.forEach(producto => {
     

      if(producto.categoria === "camperones"){
       
        this.coleccionCamperones.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}