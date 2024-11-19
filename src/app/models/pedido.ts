import { Producto } from "./producto";
//exporta los datos de la interfaz pedido.
export interface Pedido {
     idPedido:string;
     producto:Producto;
     cantidad:number;
     total:number;
}
