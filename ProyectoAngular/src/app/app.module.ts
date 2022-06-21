import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, AppRoutingProviders } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importar nuestro nuevo modulo
import { ModuloEmailModule } from './moduloemail/moduloemail.component';
import { AdministradorModule } from './administrador/administrador.module';

//Componentes
import { AppComponent } from './app.component';

//Importaciones De Componentes
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { CarrosComponent } from './components/carros/carros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditarComponent } from './components/user-editar/user-editar.component';
import { CarroDetailComponent } from "./components/carro-detail/carro-detail.component";


//Servicios

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    CarrosComponent,
    ParquesComponent,
    ContactoComponent,
    EmpleadosComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    UserEditarComponent,
    CarroDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    routing,
    AppRoutingModule,        
    ReactiveFormsModule,    
    ModuloEmailModule,
    AdministradorModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
