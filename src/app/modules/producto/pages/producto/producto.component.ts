import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  //string que modificara el valor @input en el componente hijo
  product:string='';

  //coleccion de productos añadidos a la lista
productosCarrusel:Producto[] = [];

productoAnadido(producto:Producto){
  //modificador del valor de 'product'
  this.product = `${producto.nombre} : $${producto.precio}`;

  try {
    /*agregamos la informacion por el
    parametro de la funcion a la coleccion 
    del carrusel*/
    
    this.productosCarrusel.push(producto);

  Swal.fire({
    title:'bien',
    text: 'producto',
    icon: 'info'
  })
  } catch (error) {
    Swal.fire({
      title:'¡oh no!',
      text: 'ah ocurrido un error\n'+error,
      icon: 'error'
    })
  }
}
}
