import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  productos:Pedido[] = [];
//los servicios del carrito son llamados del constructor y son utilizados en cualquier parte de la pagina
  constructor(
    public servicioCarrito:CarritoService,
    public servicioAuth: AuthService
  ){}

  //obtenemos el rol o ID del usuario para verificar que este logueado correctamente
  ngOninit(){
    this.servicioAuth.obtenerUid().then(uid => {
      if (uid) {
        this.servicioAuth.obtenerRol(uid).subscribe(rol=>{
          //inicializamos el carrito
          if(rol === 'usuario'){
            this.servicioCarrito.iniciarCart();

            this.servicioCarrito.obtenerCarrito().subscribe(producto =>
              this.productos = producto
            )
          }else{
            console.error('No se pudo obtener el usuario')
          }
        })
      }
    })
  }
  quitarPedido(pedido:Pedido){
    this.servicioCarrito.borrarPedido(pedido)
  }
}
