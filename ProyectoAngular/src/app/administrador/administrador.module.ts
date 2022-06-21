//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { MainComponent } from "./components/main/main.componen";
import { ListadoComponent } from './components/lista/listado.component';
import { AgregarComponent } from "./components/agregar/agregar.component";
import { EditarComponent } from "./components/editar/editar.component";

//Servicios
import { UserService } from '../services/user.service';
import { AdminGuard } from '../services/admin.guard';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    declarations: [
        MainComponent,
        ListadoComponent,
        AgregarComponent,
        EditarComponent,
        SearchPipe
    ], 
    imports: [
        CommonModule,
        FormsModule,
        AdministradorRoutingModule,
        BrowserAnimationsModule
    ],
    exports:[
        MainComponent,
        ListadoComponent,
        AgregarComponent,
        EditarComponent
    ],
    providers:[
        UserService, 
        AdminGuard,
    ]
})
export class AdministradorModule { }

