import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router'; // tarvitaan navigateToList() -metodia varten

import { Contact } from '../contact';

@Component({
  selector: 'app-contactnew',
  templateUrl: './contactnew.component.html',
  styleUrls: ['./contactnew.component.css'],
})
export class ContactnewComponent implements OnInit {
  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {}

  // kontakti serverille
  onSubmit(formData: any) {
    console.log(formData);
    this.contactService.addContact(formData);
  }

  navigateToList() {
    this.router.navigate(['/']);
  }
}
