import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-pantalones',
  templateUrl: './card-pantalones.component.html',
  styleUrls: ['./card-pantalones.component.css']
})
export class CardPantalonesComponent {


  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  
  coleccionPantalones: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
      this.mostrarProductoPantalones();

    })
   
  }

  
  mostrarProductoPantalones(){
    
    this.coleccionProductos.forEach(producto => {
     

      if(producto.categoria === "pantalones"){
       
        this.coleccionPantalones.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}