import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title: String;
    public user: User;
    public identity: | any;
    public token: | any;    
    public status: string | any; 

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Loguearse';
        this.user = new User('','','','','','ROLE_USER','');
    }

    ngOnInit(){
        console.log('login.component cargado !!');    
        console.log(this._userService.getIdentity()); 
        console.log(this._userService.getToken()); 
    }

    onSubmit() {
        //Primero conseguimos el usuario
        this._userService.singup({ user: this.user }).subscribe(
          (response) => {
            //  this.token = response['token'];
            this.identity = response.user;
    
            if (!this.identity || !this.identity._id) {
              this.status = 'error';
              alert('El Usuario No Se Ha Logueado Correctamente');
            } else {
              this.identity.password = '';
    
              localStorage.setItem('identity', JSON.stringify(this.identity));
              //Mostramos el token
              this._userService.singup({ user: this.user, gettoken: 'true' }).subscribe(
                (response) => {
                  //this.token = response['token'];
                  this.token = response.token;
    
                  if (this.token.length <= 0) {
                    alert('El Token No Se Ha Generado');
                  } else {
                    //Mostramos el token
                    localStorage.setItem('token', this.token);
                    this.status = 'success';
                    this._router.navigate(['/']);
                  }
                },
    
                (error) => {
                  this.status = 'error';
                  console.log(<any>error);
                }
              );
            }
          },
    
          (error) => {
            this.status = 'error';
            console.log(<any>error);
          }
        );
      }
    }
    