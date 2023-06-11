import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptMaterialBottomNavigationModule } from "@nativescript-community/ui-material-bottom-navigation/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BBarComponent } from "./b-bar/b-bar.component";
import { ListaComponent } from "./lista/lista.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SignupModalComponent } from "./signup-modal/signup-modal.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { KayttajaComponent } from "./kayttaja/kayttaja.component";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { ReseptitComponent } from "./reseptit/reseptit.component";
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptMaterialBottomNavigationModule,
    NativeScriptModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    BBarComponent,
    ListaComponent,
    TopBarComponent,
    SignupModalComponent,
    KayttajaComponent,
    ReseptitComponent,
    LoginModalComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
