import { Component, DoCheck, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { CarroService } from '../../../services/carro.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Carro } from '../../../models/carro';

import { fadeLateral } from '../../animacion';

@Component({
  selector: 'administrador-editar',
  templateUrl: '../agregar/agregar.component.html',
  providers: [UserService, CarroService, UploadService],
  animations: [fadeLateral]
})
export class EditarComponent implements OnInit{
  public title = 'Agregar';  
  public carro: Carro;
  public identity;
  public token;
  public url: string;
  public status: any;
  public is_editar;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userServices: UserService,
    private _carroService: CarroService,
    private _uploadService: UploadService,
  ){
    this.is_editar = true;
    this.title = 'Editar';
    this.carro = new Carro('','','', 2022, '', '');
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.url = GLOBAL.url; 
  }

  ngOnInit(): void {
    console.log('carro-agregar componente ha sido cargado !!');
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

  onSubmit(){
    let id = this.carro._id;
    this._carroService.editarCarro({token: this.token, id, carro: this.carro}).subscribe(
      response => {
        if(!this.carro){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.carro = this.carro;

          //Subir la imagen del carro
          if(!this.filesToUpload){
            this._router.navigate(['/carro', this.carro._id]);
          }else{
            //Subida de la imagen             
            this._uploadService.makeFileRequest(this.url+'upload-image-carro/'+this.carro._id, [], this.filesToUpload, this.token, 'image')
             .then((result: any) =>{
                this.carro.image = result.image;  

                this._router.navigate(['/carro', this.carro._id]);
            });
          }
        }
      },
      error =>{
        let errorMessage = <any>error;

        if(errorMessage != null){
            this.status = 'error';
        }
      }
    );
  }

  public filesToUpload: Array<File> | any;
  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
  }
}
