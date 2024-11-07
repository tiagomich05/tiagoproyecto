import { Injectable } from '@angular/core';
import { CrudService } from '../../admin/services/crud.service';
import { AuthService } from '../../autentificacion/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pedido } from 'src/app/models/pedido';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  pedido:Pedido = {
    idPedido:'',
    producto:{
      idProducto:'',
      nombre:'',
      precio:0,
      descripcion:'',
      categoria:'',
      imagen:'',
      alt:'',
      stock:0

    },
    cantidad:0,
    total:0
  }


  private pedidocoleccion: AngularFirestoreCollection<Pedido>
  private uid: string | null = null;

  constructor(
    private servicioCrud: CrudService,
    private servicioAuth: AuthService,
    private servicioFirestore: AngularFirestore
  ) {
    //creamos una subcolecion dentro de la coleccion de usuarios y le damos ese valor a pedidosColeccion 
    this.pedidocoleccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`);
  }

  //funcion para iniciar el carrito
  iniciarCart() {
    this.servicioAuth.obtenerUid().then(uid => {
      //obtenemos el ID del usuario para la sucoleccion
      this.uid = uid
      if (this.uid) {
        console.log(this.uid);
      }else {
        console.error('no se obtuvo el UID');
      }
    })
  }
  obtenerCarrito(){
    return this.pedidocoleccion.snapshotChanges().pipe(map(Action=>Action.map(a => a.payload.doc.data())))
  }
  crearPedido(producto: Producto, stock: number){
    try{
       const idPedido = this.servicioFirestore.createId();

       //remplazamos los valores de pedido por loos valores que obtuvimos
       this.pedido.idPedido = idPedido;
       this.pedido.producto = producto;
       this.pedido.cantidad = stock;
       this.pedido.total =producto.precio*stock

      this.pedidocoleccion.doc(idPedido).set(this.pedido);


    }catch (error){
      Swal.fire({
        title: '¡Oh, no!',
        text: 'Ha ocurrido un error al subir su producto',
        icon: 'error'
      })
  
  }

}

}
