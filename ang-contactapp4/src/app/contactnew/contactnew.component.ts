import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router'; // tarvitaan navigateToList() -metodia varten
import { AuthService } from '../auth.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contactnew',
  templateUrl: './contactnew.component.html',
  styleUrls: ['./contactnew.component.css'],
})
export class ContactnewComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private router: Router,
    public authService: AuthService
  ) {}

  email!: string;
  password!: string;

  ngOnInit() {}

  // kontakti serverille
  onSubmit(formData: any) {
    console.log(formData);
    this.contactService.addContact(formData);
  }

  navigateToList() {
    this.router.navigate(['/']);
  }

  // käyttöliittymän nappien metodit
  signUp() {
    this.authService.signUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signIn() {
    this.authService.signIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => (this.authService.user = null))
      .catch((e) => console.log(e.message));
  }
}
