/* Tämän on koko sovelluksen päämoduuli joka sisältää
kaikki muut moduulit ja komponentit. Ne tuodaan tänne
joko automaattisesti tai käsin */

//Importoidaan myös Firebaseen liittyvät
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactnewComponent } from './contactnew/contactnew.component';
import { ContacteditComponent } from './contactedit/contactedit.component';
import { SearchFilterPipe } from './searchfilter.pipe';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// Dekoraattori joka tekee tästä moduulin ja sisältää
// muutamia määrityksiä
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactlistComponent,
    ContactnewComponent,
    ContacteditComponent,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    /* HttpClientInMemoryWebApiModule on feikkiserverin moduuli
       joka pitää ottaa pois käytöstä kun vaihdetaan oikeaan serveriin */
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  // servicejä ei tarvitse laittaa enää tänne jos niissä on määritys { providedIn: 'root' }
  providers: [],
  bootstrap: [AppComponent], // komponentti josta sovellus käynnistyy
})
export class AppModule {}
