import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ListaComponent } from "./lista/lista.component";
import { KayttajaComponent } from "./kayttaja/kayttaja.component";
import { ReseptitComponent } from "./reseptit/reseptit.component";

const routes: Routes = [
  { path: "", redirectTo: "/lista", pathMatch: "full" },
  { path: "lista", component: ListaComponent },
  { path: "kayttaja", component: KayttajaComponent },
  { path: "reseptit", component: ReseptitComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
