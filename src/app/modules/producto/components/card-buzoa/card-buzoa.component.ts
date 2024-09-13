import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-buzoa',
  templateUrl: './card-buzoa.component.html',
  styleUrls: ['./card-buzoa.component.css']
})
export class CardBuzoaComponent {


  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  
  coleccionBuzoa: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
      this.mostrarProductoBuzoa();

    })
   
  }

  
  mostrarProductoBuzoa(){
    
    this.coleccionProductos.forEach(producto => {
     

      if(producto.categoria === "buzoa"){
       
        this.coleccionBuzoa.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}
