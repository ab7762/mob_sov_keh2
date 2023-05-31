import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

import { Contact } from '../contact';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contactedit',
  templateUrl: './contactedit.component.html',
  styleUrls: ['./contactedit.component.css'],
})
export class ContacteditComponent implements OnInit {
  // Propertyjen alustukset tehdään tässä esittelyn yhteydessä
  contacts: Contact[] = []; // komponentin kontaktitaulukko
  editmode: boolean = false; // muokkauslomake oletuksena ei näkyvissä
  password: string = '';
  email: string = '';
  name = '';
  mail = '';
  id: number = 0;
  // Service otetaan käyttöön komponentin konstruktorin argumenttina (Dependency injection)
  constructor(
    private contactService: ContactService,
    public authService: AuthService
  ) {}

  // tilataan subscribe-metodilla observable servicen getContacts -metodista
  // subscriben argumenttina on callback jolla kontaktitaulukko saadaan
  /*getContacts(): void {
    this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

  ngOnInit() {
    this.getContacts(); // suoritetaan aina kun komponentti alustetaan
    ngOnInit() {
    this.contactService.getContacts().subscribe((res: Contact[]) => {
      this.contacts = res;
    });
  }
  }*/
  ngOnInit() {
    this.contactService.getContacts().subscribe((res: Contact[]) => {
      this.contacts = res;
    });
  }

  // Lomakkeelta saadut tiedot contactServicen updateContact-metodille
  onSubmit(formData: any) {
    this.contactService
      .updateContact(formData)
      .then(() => console.log('Data add successfully'));
    // tyhjennetään lomakkeen kentät kun päivitys on suoritettu
    this.name = '';
    this.email = '';
    this.id = 0;
  }
  //Laitetaan muokkauslomake näkyviin ja laitetaan
  //lomakkeelle arvot joita muokataan. Varsinainen muokkaus
  //tapahtuu muokkauslomakkeelta laukaistavassa onSubmit-metodissa

  edit(c: Contact) {
    this.editmode = true;
    this.name = c.name;
    this.email = c.email;
    this.id = c.id;
  }
  /*
  // poisto
  remove(c: Contact) {
    this.editmode = false;
    // console.log('Poistetaan: ' + c.id);
    // poistetaan kontakti käyttöliittymästä filter-metodilla
    this.contacts = this.contacts.filter((contact) => contact !== c);
    // poistetaan kontakti kannasta servicen removeContact-metodilla
    this.contactService.removeContact(c.id).subscribe();
  }*/
  remove(c: Contact) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.contactService
        .deleteContact(c)
        .then(() => console.log('delete successful'));
    }
  }

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
