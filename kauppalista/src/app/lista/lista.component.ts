import { Component, OnInit } from "@angular/core";
import { TopBarComponent } from "../top-bar/top-bar.component";
import { TextField } from "@nativescript/core";

import {
  prompt,
  inputType,
  Dialogs,
  DialogOptions,
  isDialogOptions,
} from "@nativescript/core/ui/dialogs";
import { AuthService } from "../auth.service";
import { KauppalistaService } from "../kauppalista.service";
import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-firestore";
import { Router } from "@angular/router";
@Component({
  selector: "ns-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.css"],
})
export class ListaComponent implements OnInit {
  // Komponentin alustuksen yhteydessä haetaan käyttäjä ja kauppalista servicestä.
  constructor(
    public authService: AuthService,
    public kauppalistaService: KauppalistaService,
    private router: Router
  ) {
    this.user = this.authService.user;
    this.listat = this.authService.getListat();
  }
  user!: any | null;
  listat: any[] = [];
  tuote: string = "";

  ngOnInit() {
    this.kauppalistaService.haeListat().then((res) => {
      let lista = res.filter((x) =>
        x.kayttajat.includes(this.authService.user.email)
      );
      console.log(lista);
      this.authService.listat = lista;
      this.listat = lista;
    });
    console.log(this.authService.listat);
    console.log(this.authService.user);
  }
  // Funktion listan luomiseen. Avataan dialogi, jossa annetaan tiedot joilla luodaan kauppalista.
  // Lista luodaan firebasen Firestoreen, jonne lähetetään myös käyttäjä, joka tallennetaan myös kantaan.
  luoLista(data: any) {
    const options = {
      title: "Luo kauppalista",
      message: "Anna kauppalistan nimi ja salasana ", // Käytä dataa viestissä
      okButtonText: "OK",
      cancelButtonText: "Cancel",
      userName: "kauppalista",
      password: "password",
      data: data,
    };

    Dialogs.login(options).then((r) => {
      if (r.result == false) {
        return false;
      }
      if (r.result == true) {
        firebase()
          .firestore()
          .collection("kauppalista")
          .add({
            nimi: r.userName,
            salasana: r.password,
            kayttajat: [data],
          })
          .then(() => {
            console.log("Lisätty");
          });
        this.router.navigate(["lista"]);
      }

      this.kauppalistaService.haeListat().then((res) => {
        let lista = res.filter((x) =>
          x.kayttajat.includes(this.authService.user.email)
        );
        console.log(lista);
        this.authService.listat = lista;
        this.listat = lista;
      });
    });
  }
  // Dialogissa liitytään jo olemassa olevalle kauppalistalle.
  // Jos tunnus ja salasana kohtaavat, lisätään käyttäjä listalle.
  // Virheellisten tietojen jälkeen annetaan alert-funktiolla ilmoitus, että tiedot ei täsmää.
  liityListalle(data: any) {
    const options = {
      title: "Liity kauppalistaan",
      message: "Anna kauppalistan nimi ja salasana ", // Käytä dataa viestissä
      okButtonText: "OK",
      cancelButtonText: "Cancel",
      userName: "kauppalista",
      password: "password",
    };

    Dialogs.login(options).then((r) => {
      if (r.result == false) {
        return false;
      }
      if (r.result == true) {
        this.kauppalistaService.haeListat().then((result) => {
          const filteredList = result.filter(
            (item) => item.nimi === r.userName && item.salasana === r.password
          );
          console.log(filteredList[0] + " Tässä listat");
          if (filteredList.length < 1) {
            alert("Tiedoilla ei löydy kauppalistaa");
            this.router.navigate(["lista"]);
          }
          if (filteredList.length > 0) {
            this.kauppalistaService.lisaaKayttajaListaan(
              `kauppalista/${filteredList[0].id}`,
              "kayttajat",
              this.authService.user.email
            );

            this.router.navigate(["lista"]);
          }
        });
      }
    });
  }

  onTextChange(args) {
    let textField = <TextField>args.object;
    this.tuote = textField.text;
  }
  onReturnPress(args) {
    // returnPress event will be triggered when user submits a value
    let textField = <TextField>args.object;
    this.tuote = "";
  }

  onFocus(args) {
    // focus event will be triggered when the users enters the TextField
    let textField = <TextField>args.object;
  }

  onBlur(args) {
    // blur event will be triggered when the user leaves the TextField
    let textField = <TextField>args.object;
  }
  // Lisätään tuote- alidokumenttiin tieto.
  lisaaListaan(input) {
    this.kauppalistaService.lisaaTuote(this.authService.listat[0].id, "tuote", {
      nimi: this.tuote,
    });
    this.tyhjennaInput(input);
    this.kauppalistaService.haeListat().then((res) => {
      let lista = res.filter((x) =>
        x.kayttajat.includes(this.authService.user.email)
      );
      this.authService.listat = lista;
      console.log(this.authService.listat);
      this.listat = lista;
    });
  }
  tyhjennaInput(textField: TextField) {
    textField.text = "";
  }
  // Poistetaan id:perusteella alidokumentista tieto.
  poista(id) {
    this.kauppalistaService.poistaIdPerusteella(
      "kauppalista",
      "tuote",
      this.listat[0].id,
      id
    );
    this.kauppalistaService.haeListat().then((res) => {
      let lista = res.filter((x) =>
        x.kayttajat.includes(this.authService.user.email)
      );
      console.log(lista);
      this.listat = lista;
    });
  }
}
