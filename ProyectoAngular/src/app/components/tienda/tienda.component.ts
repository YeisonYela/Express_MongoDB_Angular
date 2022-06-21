import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fundido } from '../animacion';

declare var jQuery:any;
declare var $:any; 

@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [fundido]
})
export class TiendaComponent implements OnInit{
  public titulo;
  public nombreDelParque: string;
  public miParque: any;
 
  constructor() {
    this.titulo = '';
    this.nombreDelParque = '';
  }
  ngOnInit(): void {
    $('#botonjq').click(function(){
      $('#textojq').removeClass('dropdown-menu').fadeIn();
    });
   
  }
 
  mostrarNombre() {
    console.log(this.nombreDelParque);
  }
    
  verDatosParque(event: any){
    console.log(event);
    this.miParque = event;
  }

}