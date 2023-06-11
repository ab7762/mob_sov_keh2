import { Injectable } from "@angular/core";
import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}
  user: any = {}; //Firebasesta saatava käyttäjäolio

  isLogged: boolean = false;
  listat: any = [];
  // Uuden käyttäjän luonti. Käyttää Firebasen omaa metodia.
  signUp(email: string, password: string) {
    firebase()
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Successfully signed up!", res.user);
        this.user = res.user;
        this.isLogged = true;
        console.log(this.user.email);
      })
      .catch((error) => {
        prompt("Something is wrong:", error.message);
      });
  }
  // Palauttaa authservicen listat-muuttujan
  getListat(): any[] {
    return this.listat;
  }
  // Sisäänkirjautuminen. Käyttää Firebasen omaa metodia.
  logIn(email: string, password: string) {
    firebase()
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Successfully signed up!", res.user);
        this.user = res.user;
        this.isLogged = true;
        console.log(this.user.email);
      })
      .catch((error) => {
        prompt("Something is wrong:", error.message);
      });
  }
}
