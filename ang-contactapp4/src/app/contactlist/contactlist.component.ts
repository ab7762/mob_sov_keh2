// importataan tarvittavat kirjastot
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactService } from '../contact.service';
import { debounceTime } from 'rxjs/operators';

import { Contact } from '../contact';
// import { mockcontacts } from '../mock-contacts';
/*
@Component -dekoraattori eli annotaatio tekee luokasta
komponentin ja antaa sille olion sisällä pari määritystä
*/
@Component({
  selector: 'app-contactlist', // komponentin tagin nimi
  templateUrl: './contactlist.component.html', // polku komponentin templaattiosaan
  styleUrls: ['./contactlist.component.css'], // polku komponentin omaan css:ään
})
// komponentin luokkaosa eli TS-luokka
// toteuttaa OnInit -rajapinnan josta metodi ngOnInit
export class ContactlistComponent implements OnInit {
  // otetaan mockcontacts komponenttiin sisään
  // contacts = mockcontacts;

  contacts: Contact[] = []; // servicestä tuleva data tulee tänne

  nameFilter: FormControl = new FormControl(); // nameFilter -muuttuja on tyypiltään FormControl -olio ja Observable
  filterCriteria: string = ''; // hakuarvo jonka perusteella listaa filtteröidään
  field: string;
  fields: string[];

  // Service otetaan käyttöön komponentin konstruktorin argumenttina (Dependency injection)
  constructor(private contactService: ContactService) {
    this.field = 'name'; // oletushakukenttä
    this.fields = ['name', 'email']; // hakukentät valikossa

    // kontaktien haku voi olla myös konstruktorissa
    /* this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts); */

    /* filtteröinti on reaktiivinen eli tehdään RxJS:llä.
     nameFilter on observable joka lähettää käyttäjän syötteen streamina.
     Joka kerta kun hakulomakkeella arvo muuttuu, emitoidaan valueChanges
     -event joka tuottaa observable -streamin joka tilataan. Subscribe -metodi
     laukaisee anonyymin funktion joka palauttaa filterCriterian jonka
     perusteella kontaktilistaa filtteröidään.
  */
    this.nameFilter.valueChanges // tämä on observable
      .pipe(debounceTime(100)) // debounceTime on viive merkkien syöttämisen välissä
      .subscribe({
        // streamin tilaus, subscribella on argumenttina olio, jossa on kaksi anonyymia funktiota. Eka laukaistaan jos homma onnistuu
        next: (value) => (this.filterCriteria = value),
        error: (error) => console.error(error),
      });
  }

  // tilataan subscribe-metodilla observable servicen getContacts -metodista
  // subscriben argumenttina on callback jolla kontaktitaulukko saadaan
  /*_getContacts(): void {
    this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }
*/
  /*
  ngOnInit() {
    this._getContacts(); // suoritetaan aina kun komponentti otetaan käyttöön
  }*/
  // suoritetaan kun lomakkeen select -valintaa vaihdetaan
  onSelect(target: any) {
    console.log(target);
    this.field = target; // vaihdetaan oletushakukenttä
  }
  ngOnInit() {
    this.contactService.getContacts().subscribe((res: Contact[]) => {
      this.contacts = res;
    });
  }
}
