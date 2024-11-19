import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root' // Haciendo este servicio disponible globalmente en la aplicación
})
export class FirestoreService {
  // Definición de la colección de usuarios de Firestore, la cual contendrá documentos de tipo 'Usuario'
  private usuarioCollection: AngularFirestoreCollection<Usuario>;

  // Constructor del servicio, donde se inyecta la instancia de AngularFirestore
  constructor(private database: AngularFirestore) {
    // Inicializamos la colección 'usuarios' dentro de Firestore
    this.usuarioCollection = this.database.collection<Usuario>('usuarios');
  }

  /**
   * Método para agregar un nuevo usuario a la colección 'usuarios' de Firestore.
   * 
   * @param usuario El objeto 'usuario' que contiene los datos del nuevo usuario.
   * @param id El ID que será asignado al documento en Firestore (generalmente generado o proporcionado por el backend).
   * @returns Una promesa que resolverá el resultado de la operación de agregar el usuario.
   */
  agregarUsuario(usuario: Usuario, id: string): Promise<any> {
    // Retorna una nueva promesa para realizar la operación asincrónica
    return new Promise(async (resolve, reject) => {
      try {
        // Asignamos el ID proporcionado al usuario antes de guardarlo en Firestore
        usuario.uid = id;

        // Usamos 'set' para establecer el documento del usuario en la colección 'usuarios' con el ID proporcionado
        const resultado = await this.usuarioCollection.doc(id).set(usuario);

        // Si la operación es exitosa, resolvemos la promesa con el resultado de la operación
        resolve(resultado);
      } catch (error) {
        // Si ocurre algún error durante la operación, rechazamos la promesa con el error
        reject(error);
      }
    });
  }
}
