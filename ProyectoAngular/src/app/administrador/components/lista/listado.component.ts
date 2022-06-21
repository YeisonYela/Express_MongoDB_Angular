import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { CarroService } from '../../../services/carro.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Carro } from '../../../models/carro';

import { fadeLateral } from '../../animacion';

@Component({
  selector: 'administrador-listado',
  templateUrl: './listado.component.html',
  providers: [CarroService, UserService],
  animations: [fadeLateral]
})
export class ListadoComponent implements OnInit{
  public title: string;
  public numbers = new Array(10);
  public carros: Carro[];
  public token;
  public busqueda: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,    
    private _carroService: CarroService,
    private _userService: UserService
  ){
   this.title = 'Listado De Carros';
   this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getCarros();
  }

  getCarros(){
    this._carroService.getCarros().subscribe(
      response => {
        if(!this.carros){
          console.table(response.message)
          this.carros = response.message;
        }else{
          this.carros = this.carros;
        }               
      },
      error => {
         console.log(<any>error);
      }
    );
  }

  deleteCarro(id: any){    
    this._carroService.deleteCarro({token: this.token, id}).subscribe(
      response => {
        if(!this.carros){
          alert('Error en el servidor');
        }
        this.getCarros();
      },
      error => {
        alert('Error en el servidor');
      }
    );
  }

  refresh(): void { 
    window.location.reload(); 
  }
}
