import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-remeras',
  templateUrl: './card-remeras.component.html',
  styleUrls: ['./card-remeras.component.css']
})
export class CardRemerasComponent {


  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  
  coleccionRemeras: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
      this.mostrarProductoRemeras();

    })
   
  }

  
  mostrarProductoRemeras(){
    
    this.coleccionProductos.forEach(producto => {
     

      if(producto.categoria === "remeras"){
       
        this.coleccionRemeras.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}