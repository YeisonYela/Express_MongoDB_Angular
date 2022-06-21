import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {User} from '../../models/user';
import { GLOBAL } from "../../services/global";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'registrar',
    templateUrl: './registrar.component.html',
    styleUrls: ['./registrar.component.css'],
    providers: [UserService]
})
export class RegistrarComponent implements OnInit{
    public title: String;    
    public user: User;
    public message: string | any;
    public status: string | any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Registrarse';        
        this.user = new User('','','','','','ROLE_USER','');
    }

    ngOnInit(){
        console.log('registrar.component cargado !!');        
    }

    onSubmit(registerForm: { reset: () => void; }){
        this._userService.register({ user: this.user }).subscribe(
            response=>{
                console.log(response);
                if(response.user && response.user._id){
                    this.status = 'success';
                    this.user = new User('','','','','','ROLE_USER','');
                    registerForm.reset();
                }else{
                    this.status = 'error';
                }
            },
            error =>{
                console.log(<any>error);
            }
        )        
    }
}

