import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

import { fundido } from '../animacion';

@Component({
  selector: 'empleados',
  templateUrl: './empleados.component.html',
  providers: [UserService],
  animations: [fundido]
})
export class EmpleadosComponent implements OnInit {
  public title: string;
  public empleados: User[];
  public url;

  constructor(
    private _userService: UserService
  ){
    this.title = 'Empleados';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log("empleados.component cargado !!");
    this.getEmpleados();
  }

  getEmpleados(){
    this._userService.getEmpleados().subscribe(
      response => {
       
        console.table(response.users)
          this.empleados = response.users;
      },
      error => {
         console.log(<any>error);
      }
    );
  }
}
