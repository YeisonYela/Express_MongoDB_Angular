import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {User} from '../../models/user';
import { GLOBAL } from "../../services/global";
import { UserService } from "../../services/user.service";
import { UploadService } from '../../services/upload.service';

@Component({
    selector: 'user-editar',
    templateUrl: './user-editar.component.html',
    styleUrls: ['./user-editar.component.css'],
    providers: [UserService, UploadService]
})

export class UserEditarComponent implements OnInit{
    public title: string;
    public user: User;
    public identity;
    public token;
    public status: string | any;
    public url: string;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService 
    ){
        this.title = 'Actualizar Mis Datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        console.log('user-editar.component.ts cargado !!');
    }

    onSubmit(){
        this._userService.updateUser({ user: this.user }).subscribe(
            response => {
                if(!this.user){
                    this.status = 'error';
                }else{
                    this.status = 'success'
                    localStorage.setItem('identity', JSON.stringify(this.user));

                    //Subida de la imagen  
                    this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
                        .then((result: any) =>{
                            this.user.image = result.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));                            
                        });
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