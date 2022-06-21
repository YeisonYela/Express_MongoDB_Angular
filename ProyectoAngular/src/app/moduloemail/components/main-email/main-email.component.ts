import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'main-email',
  template: `
  <div class="card">
    <div class="card-body">
        <h2>{{title}}</h2>
        <hr/>
        <mostrar-email></mostrar-email>
        <guardar-email></guardar-email>
    </div>
    </div>
  `,
})
export class MainEmailComponent implements OnInit {
  title = 'Modulo de email';

  ngOnInit(): void {
      console.log("Componente principal del modulo cargado");
  }
}
 