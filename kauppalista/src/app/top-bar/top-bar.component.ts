import { Component, ViewContainerRef } from "@angular/core";
import {
  Dialogs,
  prompt,
  PromptOptions,
  PromptResult,
  TextField,
} from "@nativescript/core";

import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular";
import { SignupModalComponent } from "../signup-modal/signup-modal.component";
import { AuthService } from "../auth.service";
import { KauppalistaService } from "../kauppalista.service";
import { Router } from "@angular/router";
@Component({
  selector: "ns-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent {
  constructor(
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef,
    public authService: AuthService,
    public kauppalistaService: KauppalistaService,
    private router: Router
  ) {}
  // logIn avaa dialogin, jossa suoritetaan authServicen logIn-metodi.
  logIn() {
    Dialogs.login({
      title: "Kirjaudu sisään",
      message: "Anna käyttäjätunnus ja salasana",
      okButtonText: "Lähetä",
      cancelButtonText: "Peruuta",
      userName: "ktunnus",
      password: "salasana",
    }).then((r) => {
      if (r.result == false) {
        // Virheen käsittely, ohjaa käyttäjä toiseen reittiin
        this.router.navigate(["/lista"]);
      }
      if (r.result == true) {
        this.authService.logIn(r.userName, r.password);

        console.log(this.authService.listat);

        this.router.navigate(["/kayttaja"]);
      }
    });
  }
  // SignUp-metodilla siirrytään SignupModaliin.
  signUp() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {},
      fullscreen: true,
    };

    this.modalService
      .showModal(SignupModalComponent, options)
      .then((result) => {
        console.log("Modal suljettu");
      });
  }
}
