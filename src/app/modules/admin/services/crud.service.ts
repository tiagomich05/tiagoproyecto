import { Injectable, ɵComponentFactory } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
//importaciones para el manejo de archivos y referencias de storange
import {getDownloadURL, getStorage,ref, UploadResult, uploadString, deleteObject} from 'firebase/storage'

/*
getDownloadURL -> para obtener la URL de descarga de una imagen subida
getstorange -> para obtener la instancia de almacenamiento
ref -> para crear referencias a ubicaciones en el almacenamiento
UploadResult -> tipo que representa el resultado de una operacion subida
UploadString -> para subir imagenes en formato cadena (string)
deleteObject ->para eliminar un espacio en el almacenamiento
*/

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productosCollection:AngularFirestoreCollection<Producto>

  //definimos variable "resupeusta" que podra subir resultados
  private respuesta!: UploadResult;

  //inicializamos servicio de Storage
  private storage = getStorage(); 

  constructor(private database:AngularFirestore) {
    this.productosCollection = database.collection('producto');
   }



   //CREAR productos -> obtiene datos del formulario y url de la imagen
   crearProducto(producto :Producto, url: string){
    return new Promise(async (resolve,reject) =>{
      try{
        const idProducto = this.database.createId();

        producto.idProducto = idProducto;

        //asignar la url recibida del parametro al atributo imagen de la interfaz producto
        producto.imagen=url;

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      }catch(error){
        reject(error);
      }
    });
   }
   //Obtener productos
   obtenerProductos(){
    return  this.productosCollection.snapshotChanges().pipe(map(action => action.map(a =>a.payload.doc.data())));
   }
   //EDITAR productos
   modificarProducto(idProducto:string, nuevaData: Producto){
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
   }
   //ELIMINAR productos
   eliminarProducto(idProducto:string, imagenURL:string){
    return new Promise ((resolve, reject) => {
      try{
        //definimos referencia local desde el almacenamiento de storage
        const storage = getStorage();

       //accedo a lacoleccion, busco id y lo elimino
       const referenciasImagen = ref(storage, imagenURL);
        
       deleteObject(referenciasImagen)
       .then((res)=>{
        
       


        const respuesta = this.productosCollection.doc(idProducto).delete();
        resolve (respuesta);
       })
       .catch(error => {
        reject("error al eliminar la imagen: \n"+error)
       })
       
      

      }
      catch(error){
        reject(error);
      }

    })
   }

   obtenerURLImagen(respuesta:UploadResult){
    return getDownloadURL(respuesta.ref)
  }
  /** 
  *PARAMETROS DEFINIDOS
  * @param {string} nombre <-nombre de la imagen
  * @param {any} imagen <- tipo de omagenes que se pueda subir (extensiones)
  * @param {string} ruta <- ruta de almacenamiento de las imagenes
  * @returns <- se retona lo obtenido
  */

  async subirImagen(nombre: string, imagen: any, ruta:string){
    try{
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
      .then(resp => {
        return resp;
      })
      return this.respuesta

      
    }
    catch(error){
      console.log("error: \n" +error);

      return this.respuesta
    }
  }
}
