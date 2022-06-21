import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

//Componentes

import { MainComponent } from "./components/main/main.componen";
import { ListadoComponent } from './components/lista/listado.component';
import { AgregarComponent } from "./components/agregar/agregar.component";
import { EditarComponent } from "./components/editar/editar.component";

import { AdminGuard } from '../services/admin.guard';

const administradorRoutes: Routes = [
    {
        path: 'administrador-panel',
        component: MainComponent,
        canActivate: [AdminGuard],
        children: [
            {path: '', redirectTo: 'Lista', pathMatch: 'full'},
            {path: 'Lista', component: ListadoComponent},
            {path: 'Agregar', component: AgregarComponent},
            {path: 'Editar/:id', component: EditarComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(administradorRoutes)
    ], 
    exports: [
        RouterModule
    ]
})
export class AdministradorRoutingModule{ }











