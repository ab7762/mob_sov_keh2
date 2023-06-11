import { Component } from "@angular/core";

import { ModalDialogParams } from "@nativescript/angular";
import { TextField } from "@nativescript/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BindingOptions } from "@nativescript/core";
import { KauppalistaService } from "../kauppalista.service";
import { Router } from "@angular/router";
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  DocumentReference,
  setDoc,
} from "@angular/fire/firestore";
import { AuthService } from "../auth.service";
import { firebase } from "@nativescript/firebase-core";

@Component({
  selector: "ns-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"],
})
export class LoginModalComponent {
  constructor(
    private params: ModalDialogParams,
    public authService: AuthService,
    private router: Router,
    public kauppalistaService: KauppalistaService
  ) {}
  form: FormGroup;
  ktunnus: string = "";
  salasana: string = "";
  salasana2: string = "";
  onTextChangeSalasana(args) {
    let textField = <TextField>args.object;
    this.salasana = textField.text;
  }

  onTextChangeSalasana2(args) {
    let textField = <TextField>args.object;
    this.salasana2 = textField.text;
  }

  onTextChange(args) {
    let textField = <TextField>args.object;
    this.ktunnus = textField.text;
  }
  onReturnPress(args) {
    // returnPress event will be triggered when user submits a value
    let textField = <TextField>args.object;

    // Gets or sets the placeholder text.
    console.log(textField.hint);
    // Gets or sets the input text.
    console.log(textField.text);
    // Gets or sets the secure option (e.g. for passwords).
    console.log(textField.secure);

    // Gets or sets the soft keyboard type. Options: "datetime" | "phone" | "number" | "url" | "email"
    console.log(textField.keyboardType);
    // Gets or sets the soft keyboard return key flavor. Options: "done" | "next" | "go" | "search" | "send"
    console.log(textField.returnKeyType);
    // Gets or sets the autocapitalization type. Options: "none" | "words" | "sentences" | "allcharacters"
    console.log(textField.autocapitalizationType);

    // Gets or sets a value indicating when the text property will be updated.
    console.log(textField.updateTextTrigger);
    // Gets or sets whether the instance is editable.
    console.log(textField.editable);
    // Enables or disables autocorrection.
    console.log(textField.autocorrect);
    // Limits input to a certain number of characters.
    console.log(textField.maxLength);

    setTimeout(() => {
      textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
    }, 100);
  }

  onFocus(args) {
    // focus event will be triggered when the users enters the TextField
    let textField = <TextField>args.object;
  }

  onBlur(args) {
    // blur event will be triggered when the user leaves the TextField
    let textField = <TextField>args.object;
  }
  onCloseModal() {
    this.params.closeCallback();
  }
  // Authservicen logIn-metodi suoritetaan kun lähetetään tiedot.
  onSubmit() {
    this.authService.logIn(this.ktunnus, this.salasana);
    console.log(this.authService.user);

    this.onCloseModal();
  }
}
