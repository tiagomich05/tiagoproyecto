import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //Crear collecion de productos del tipo producto -> lo definimos como un array
  coleccionProductos: Producto[] = [];

  modalVisibleProducto: boolean = false;

  productoSeleccionado!: Producto

  nombreImagen!: string; //obtendra el nombre de la imagen

  imagen!: string; //obtendra la ruta de la iamgen

  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    //imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  })
  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        //imagen ahora toma la URL generada desde storage
        imagen: '',
        alt: this.producto.value.alt!,
      }

      //enviamos
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "producto")
        .then(resp => {

          //encapsulamos respuesta y enviamos la informacion obtenida
          this.servicioCrud.obtenerURLImagen(resp)
            .then(url => {

              //ahora metodo crearproducto recibe los datos del formulario y la URL formateada
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  alert("ha agregado un nuevo producto con exito :)")
                  // Limpiamos formulario para agregar nuevos productos
                  this.producto.reset();
                })
                .catch(error => {
                  alert("hubo un problema al agregar un nuevo producto :(");
                  this.producto.reset();
                })

            })
        }

        )



    }
  }



  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true; //abre el modal
    this.productoSeleccionado = productoSeleccionado;
  }
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;

    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      //imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
  }

  editarProducto() {
    let datos: Producto = {
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!,
    }

    //verificamos que el usuario ingrese una nueva imagen o no 
    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerURLImagen(resp)
            .then(url => {
              //actualizamos URL de la imagen en los datos del formulario
              datos.imagen = url;

              //atualizamos los datos desde el formulario de edicion
              this.actualizarProducto(datos);

              //vaciamos casillas del formulario
              this.producto.reset();
            })
            .catch(error => {
              alert("hubo un problema al subir la imagen :( /n" + error);

              this.producto.reset();
            })
        })
    } else {
      /*
      actualizamos formulario 
      imagen ya existente en firestore y storage
      */
      this.actualizarProducto(datos)

    }
  }




  //funcion para eliminar definitivamente al producto
  borrarProducto() {
    //envia ID del producto eliminado y la ubicacion en el almacenamiento de STORAGE
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        alert("el producto se ha eliminado correctamente")
      })
      .catch(error => {
        alert("no se ha podido eliminar el producto /n+error");
      })
  }


  actualizarProducto(datos: Producto) {
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert("el producto fue modificado con exito");
      })
      .catch(error => {
        alert("Hubo un problema al modificar el producto");
      })
  }


  //metodo para CARGAR IMAGENES
  cargarImagen(event: any) {
    //variable para obtener el archivo subido desde el input del HTML
    let archivo = event.target.files[0];

    //variable para crear un nuevo objeto de tipo "archivo" o "fila" y poder leerlo
    let reader = new FileReader();

    if (archivo != undefined) {
      /*
      llamamos a metodo readAsDataurl para leer toda la informacion recibida.
      enviamos como parametro el archivo porque sera el encargado de tener la info.
      ingresada por el usuario
      */
      reader.readAsDataURL(archivo);

      //definimos que haremos con la informacion mediante funcion flecha
      reader.onloadend = () => {
        let url = reader.result;

        //verificamos que la URL sea existente y diferente a "nula"
        if (url != null) {

          //definimos nombre de la imagen con atributo "name" del input
          this.nombreImagen = archivo.nombreImagen

          //definimos ruta de la imagen segun URL recibida en formato cadena (string)
          this.imagen = url.toString();
        }
      }
    }

  }

}
