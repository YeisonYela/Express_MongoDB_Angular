import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Componentes
import { TiendaComponent } from './components/tienda/tienda.component';
import { CarrosComponent } from './components/carros/carros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditarComponent } from './components/user-editar/user-editar.component';
import { CarroDetailComponent } from "./components/carro-detail/carro-detail.component";

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},     
    {path: 'carros', component: CarrosComponent},     
    {path: 'contacto', component: ContactoComponent}, 
    {path: 'empleados', component: EmpleadosComponent},
    {path: 'tienda', component: TiendaComponent},
    {path: 'registro', component: RegistrarComponent},
    {path: 'login', component: LoginComponent},
    {path: 'mis-datos', component: UserEditarComponent},
    {path: 'carro/:id', component: CarroDetailComponent},
    {path: '**', component: InicioComponent} //Cuando la ruta falle   
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
