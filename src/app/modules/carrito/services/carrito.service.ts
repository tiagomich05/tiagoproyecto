import { Injectable } from '@angular/core';
import { CrudService } from '../../admin/services/crud.service';
import { AuthService } from '../../autentificacion/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pedido } from 'src/app/models/pedido';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

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


  // Se declara una colección de pedidos asociada a la base de datos Firestore
private pedidocoleccion: AngularFirestoreCollection<Pedido>;
// Variable para almacenar el UID del usuario autenticado
private uid: string | null = null;

constructor(
  // Inyección de servicios necesarios: CRUD, autenticación, Firestore, y rutas
  private servicioCrud: CrudService,
  private servicioAuth: AuthService,
  private servicioFirestore: AngularFirestore,
  public servicioRutas: Router
) {
  // Inicialización de la colección de pedidos (aunque el UID todavía es null)
  this.pedidocoleccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`);
}

// Función para iniciar el carrito de compras, obteniendo el UID del usuario
iniciarCart() {
  // Se obtiene el UID del usuario autenticado
  this.servicioAuth.obtenerUid().then(uid => {
    // Asignamos el UID obtenido a la variable `uid`
    this.uid = uid;
    console.log(this.uid);
    // Si no se obtiene el UID (usuario no autenticado), mostramos un mensaje de error y redirigimos al carrito
    if (this.uid === null) {
      console.error('no se obtuvo el UID. Intente iniciar secion');
    } else {
      // Si el UID es válido, se establece la colección de pedidos asociada a este usuario
      this.pedidocoleccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`);
    }
  });
}

// Función para obtener todos los pedidos del carrito del usuario
obtenerCarrito() {
  // Se devuelve un observable con todos los cambios en la colección de pedidos
  return this.pedidocoleccion.snapshotChanges().pipe(
    map(Action => 
      // Se mapea cada acción para extraer solo los datos del documento
      Action.map(a => a.payload.doc.data())
    )
  );
}

// Función para crear un nuevo pedido en el carrito
crearPedido(producto: Producto, stock: number) {
  try {

    // Generamos un nuevo ID único para el pedido
    const idPedido = this.servicioFirestore.createId();

    // Se asignan los detalles del pedido
    this.pedido.idPedido = idPedido;
    this.pedido.producto = producto;
    this.pedido.cantidad = stock;
    this.pedido.total = producto.precio * stock;  // Calculamos el total del pedido

    // Se guarda el nuevo pedido en Firestore, utilizando el ID generado
    this.pedidocoleccion.doc(idPedido).set(this.pedido);
  } catch (error) {
    // Si ocurre un error, se muestra una notificación de error
    Swal.fire({
      title: '¡Oh, no!',
      text: 'Ha ocurrido un error al subir su producto',
      icon: 'error'
    });
  }
}

// Función para borrar un pedido del carrito
borrarPedido(pedido: Pedido) {
  try {
    // Se elimina el pedido de la colección en Firestore utilizando el ID del pedido
    this.pedidocoleccion.doc(pedido.idPedido).delete();

    // Se muestra una notificación informando que el pedido ha sido borrado exitosamente
    Swal.fire({
      text: 'Ha borrado su pedido con éxito',
      icon: 'info'
    });
  } catch (error) {
    // Si ocurre un error, se muestra una notificación de error
    Swal.fire({
      text: 'Ha ocurrido un error: n/' + error,
      icon: 'error'
    });
  }
}
}