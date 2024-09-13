import { Component } from '@angular/core';


//PORTAMOS NUESTRO CODIGO
import { Pais } from 'src/app/models/pais';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
//PROPIEDAD PUBLICA (TIPO ARRAY)
  public info:Pais[];
  constructor(){
   this.info=[
     {
       id: "remera titular de river 2024",
       nombre: "",
       edad: 0,
       imagen:"https://tiendariver.vteximg.com.br/arquivos/ids/170876-1000-1000/HY3210_FR_Torso_eCom.jpg?v=638418057460170000",
       alt:""
     },
   {
     id: "buzo alternativo de river 2022",
     nombre: "",
     edad: 0,
     imagen:"https://tiendariver.vteximg.com.br/arquivos/ids/171002-500-500/HY0439_F.png?v=638458761125930000",
     alt:""
   },
   {
     id: "conjunto de entrenamiento 2019",
     nombre: "",
     edad: 0,
     imagen:"https://http2.mlstatic.com/D_NQ_NP_649903-MLA72059410661_102023-O.webp",
     alt:""
   },    
   ]
  }
}
