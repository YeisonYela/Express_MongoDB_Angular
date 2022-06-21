import { Component, OnInit } from '@angular/core';
import { fundido } from '../animacion';

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  animations: [fundido]
})
export class ContactoComponent implements OnInit {
  title = 'Contacto';
  emailContacto: string; 

  constructor() {    
    this.emailContacto = '';
  }

  ngOnInit(){
    console.log("contacto.component cargado !!");
    }
//Guardar
    guardarEmail(){
      localStorage.setItem('emailContacto', this.emailContacto);
      console.log(localStorage.getItem('emailContacto'));
    }


}