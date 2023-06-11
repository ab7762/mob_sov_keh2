import { Injectable } from "@angular/core";
import { firebase } from "@nativescript/firebase-core";

import "@nativescript/firebase-firestore";

@Injectable({
  providedIn: "root",
})
export class KauppalistaService {
  constructor() {}
  // Funktio, joka palauttaa kaikki kauppalistat ja alidokumentit.
  async haeListat() {
    const markers = [];
    const querySnapshot = await firebase()
      .firestore()
      .collection("kauppalista")
      .get();

    for (const doc of querySnapshot.docs) {
      const markerData = doc.data();
      const markerWithId = { id: doc.id, ...markerData };

      // Nouda alidokumentit
      const subCollectionSnapshot = await firebase()
        .firestore()
        .collection("kauppalista")
        .doc(doc.id)
        .collection("tuote")
        .get();

      const subDocuments = subCollectionSnapshot.docs.map((subDoc) => {
        return { id: subDoc.id, ...subDoc.data() };
      });

      markerWithId.alidokumentit = subDocuments;

      markers.push(markerWithId);
    }

    return markers;
  }

  // Funktion uuden kauppalistan luomiseen. Listalle annetaan nimi ja salasana.
  luoLista(nimi, salasana) {
    firebase()
      .firestore()
      .collection("kauppalista")
      .add({
        nimi: nimi,
        salasana: salasana,
      })
      .then(() => {
        console.log("Lista lisätty");
      });
  }
  // lisaaTuote-funktio lisää tuotteen kauppalistalle, eli lista-dokumentin alidokumentiksi.
  // Tuote syötetään lista-komponentin input-kentästä.
  async lisaaTuote(
    parentDocumentId: string,
    subcollectionName: string,
    subdocumentData: any
  ) {
    try {
      const subcollectionRef = firebase()
        .firestore()
        .collection("kauppalista")
        .doc(parentDocumentId)
        .collection(subcollectionName);
      await subcollectionRef.add(subdocumentData);
      console.log("Alidokumentti lisätty onnistuneesti");
    } catch (error) {
      console.error("Virhe alidokumentin lisäämisessä", error);
    }
  }

  // Funktion, joka poistaa tuotteen kauppalistalta eli alidokumentista. id:n perusteella.
  async poistaIdPerusteella(
    collectionName: string,
    subcollectionName: string,
    documentId: string,
    subdocumentId: string
  ) {
    try {
      await firebase()
        .firestore()
        .collection(collectionName)
        .doc(documentId)
        .collection(subcollectionName)
        .doc(subdocumentId)
        .delete();
      console.log("Dokumentti poistettu onnistuneesti.");
    } catch (error) {
      console.error("Virhe dokumentin poistamisessa:", error);
    }
  }
  // Funktio, joka lisää käyttäjän kauppalistan käyttäjät taulukkoon.
  // Komponentissa tarkistetaan ensin, että tunnus ja salasana ovat oikein, ennen
  // kuin funktio suoritetaan.
  async lisaaKayttajaListaan(
    dokumenttiPolku: string,
    kentanNimi: string,
    uusiTieto: any
  ): Promise<void> {
    try {
      const dokumentti = firebase().firestore().doc(dokumenttiPolku);
      const snapshot = await dokumentti.get();
      const taulukko = snapshot.get(kentanNimi) || [];
      taulukko.push(uusiTieto);
      await dokumentti.update({
        [kentanNimi]: taulukko,
      });
      console.log("Uusi tieto lisätty taulukkoon onnistuneesti.");
    } catch (error) {
      console.error("Virhe uuden tiedon lisäämisessä taulukkoon:", error);
      throw error;
    }
  }
}
