import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { KauppalistaService } from "../kauppalista.service";
@Component({
  selector: "ns-kayttaja",
  templateUrl: "./kayttaja.component.html",
  styleUrls: ["./kayttaja.component.css"],
})
export class KayttajaComponent implements OnInit {
  user!: any | null;
  listat: any[] = [];
  constructor(
    public authService: AuthService,
    public kauppalistaService: KauppalistaService
  ) {
    this.user = this.authService.user;
    this.listat = this.authService.getListat();
  }
  // Komponentin alustuksen yhteydessä filteröidään kauppalista, johon käyttäjä kuuluu.
  // Myös authservicen käyttäjä otetaan ja näytetään sivulla.
  ngOnInit() {
    this.kauppalistaService.haeListat().then((res) => {
      let lista = res.filter((x) =>
        x.kayttajat.includes(this.authService.user.email)
      );

      this.authService.listat = lista;
      this.listat = lista;
    });
    console.log(this.listat);
    console.log(this.authService.user);
    this.user = this.authService.user;
  }
  // Tyhjennetään authservice.
  logOut() {
    this.authService.user = {};
    this.authService.listat = [];
    this.authService.isLogged = false;
  }
}
