import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { CarroService } from '../../services/carro.service';
import { Carro } from '../../models/carro';

@Component({
  selector: 'carro-detail',
  templateUrl: './carro-detail.component.html',
  providers: [CarroService]
})
export class CarroDetailComponent implements OnInit{    
  public carro: Carro;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,    
    private _carroService: CarroService
  ){
       this.url = GLOBAL.url;
  }

  ngOnInit(): void {
      console.log('carro-detail component cargado...');
      this.getCarro();
  }

  getCarro(){
      this._route.params.forEach((params: Params) =>{
        let id = params['id'];

        this._carroService.getCarro(id).subscribe(
            response => {
            
            console.table(response.message)
            this.carro = response.message;
            },
            error => {
                this._router.navigate(['/inicio']);
                console.log(<any>error);
            }
        );
      });
  }
}

