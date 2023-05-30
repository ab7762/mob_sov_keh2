import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
<h2>{{ title }}</h2>
<app-navbar></app-navbar>
<!-- Tähän vaihtuu routerin tarjoama SPA-näkymä eli
tässä tapauksessa komponentti-->
<router-outlet></router-outlet>
  `,
    styles: ['.app {background-color: #efefef;}']
})
export class AppComponent {
    title = 'Kontaktimuistio';
}
