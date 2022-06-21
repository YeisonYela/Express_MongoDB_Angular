import { Component, OnInit } from '@angular/core';
import { fundido } from '../animacion';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  animations: [fundido]
})
export class InicioComponent implements OnInit {
  title = 'Bienvenido Al Inicio';

  ngOnInit(){
    console.log("inicio.component cargado !!");
    }
}
