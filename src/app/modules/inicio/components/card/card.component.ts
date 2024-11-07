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
  constructor(
    
  ){
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
   {
    id: "camperon blanco 2021",
    nombre: "",
    edad: 0,
    imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKzvpIAkq8UOCGMjt0__UVkpBBKykVJendng&s",
    alt:""
  },  
  {
    id: "remera titular de river 1996",
    nombre: "",
    edad: 0,
    imagen:"https://www.thunderinternacional.com/cdn/shop/products/river-plate-1996-769181_c618ee55-94d3-40d4-a18d-25bcdfac9208.jpg?v=1652881190",
    alt:""
  },  
   ]
  }
}

