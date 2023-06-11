import {
  platformNativeScript,
  runNativeScriptAngularApp,
} from "@nativescript/angular";
import { firebase } from "@nativescript/firebase-core";

import { AppModule } from "./app/app.module";

import "@nativescript/firebase-firestore";

firebase()
  .initializeApp()
  .then((fbApp) => {
    console.log("Firebase app initialized!", fbApp.name);

    // To use with the Firebase Emulator
    // firebase().auth().useEmulator('localhost', 9099);
    // firebase().storage().useEmulator('localhost', 9199);
    // ... and other emulator ports

    // Other modules' init functions
  });
runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

// To use with the Firebase Emulator
// firebase().auth().useEmulator('localhost', 9099);
// firebase().storage().useEmulator('localhost', 9199);
// ... and other emulator ports

// Other modules' init functions
