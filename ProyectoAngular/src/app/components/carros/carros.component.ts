import { Component, OnInit } from '@angular/core';
import { Carro } from '../../models/carro';
import { CarroService } from '../../services/carro.service';
import { GLOBAL } from '../../services/global';

import { fundido } from '../animacion';

@Component({
  selector: 'carros',
  templateUrl: './carros.component.html',
  providers: [CarroService],
  animations: [fundido]
})
export class CarrosComponent implements OnInit {
  public title: string;
  public carros: Carro[];
  public url;

  constructor(
    private _carroService: CarroService
  ){
    this.title = "Carros";
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log("carros.component cargado !!");
    this.getCarros();
    }

    getCarros(){
      this._carroService.getCarros().subscribe(
        response => {
         
          console.table(response.message)
            this.carros = response.message;
        },
        error => {
           console.log(<any>error);
        }
      );
    }
}