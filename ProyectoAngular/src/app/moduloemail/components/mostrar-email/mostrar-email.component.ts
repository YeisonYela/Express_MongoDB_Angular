import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'mostrar-email',
  template: `
      
          <div *ngIf="emailContacto">
              <h4>{{title}}</h4>
              <strong> Email De Contacto: </strong>{{emailContacto}}
              <button (click)="borrarEmail()">Eliminar El Email De Contactos</button>
          </div>
  `,
})
export class MostrarEmailComponent implements DoCheck, OnInit {
  title = 'Mostrar Email';
  emailContacto: any; //datos indifinidos any


  

  ngOnInit(){
    this.emailContacto = localStorage.getItem('emailContacto');
    //console.log(localStorage.getItem('emailContacto'));
  }
    
  ngDoCheck(){
    //console.log("El Docheck se ha ejecutado");

    //Consultar el localStorage
    this.emailContacto = localStorage.getItem('emailContacto');
  }

  borrarEmail(){
    localStorage.removeItem('emailContacto');
    localStorage.clear();
    this.emailContacto = null;
  }

}
 