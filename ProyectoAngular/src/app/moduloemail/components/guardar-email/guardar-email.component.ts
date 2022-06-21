import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'guardar-email',
  template: `
      <h4>{{title}}</h4>
      <input type="text" [(ngModel)]="emailContacto" />
      <button (click)="guardarEmail()">Guardar Email</button>
  `,
})
export class GuardarEmailComponent{
  title = 'Guardar Email';
  emailContacto: any; //datos indifinidos any



  guardarEmail(){
    localStorage.setItem('emailContacto', this.emailContacto);
    console.log(localStorage.getItem('emailContacto'));
  }

}
 