import { Component, DoCheck, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { CarroService } from '../../../services/carro.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Carro } from '../../../models/carro';

import { fadeLateral } from '../../animacion';

@Component({
  selector: 'administrador-agregar',
  templateUrl: './agregar.component.html',
  providers: [UserService, CarroService, UploadService],
  animations: [fadeLateral]
})
export class AgregarComponent implements OnInit{
  public title = 'Agregar';  
  public carro: Carro;
  public identity;
  public token;
  public url: string;
  public status: any;
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userServices: UserService,
    private _carroService: CarroService,
    private _uploadService: UploadService,
  ){
    this.title = 'Agregar';
    this.carro = new Carro('','','', 2022, '', '');
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.url = GLOBAL.url; 
  }

  ngOnInit(): void {
    console.log('carro-agregar componente ha sido cargado !!');
  }

  onSubmit(){

    this._carroService.agregarCarro({token: this.token, carro: this.carro}).subscribe(
      response => {
        if(!this.carro){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.carro = this.carro;

          //Subir la imagen del carro
          if(!this.filesToUpload){
            this._router.navigate(['/administrador-panel/Lista']);
          }else{
            //Subida de la imagen             
            this._uploadService.makeFileRequest(this.url+'upload-image-carro/'+this.carro._id, [], this.filesToUpload, this.token, 'image')
             .then((result: any) =>{
                this.carro.image = result.image;                
                this._router.navigate(['/administrador-panel/Lista']);                  
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
