// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:8080/rentparking/",
  firebase: {
    apiKey: 'AIzaSyDcXxlaPbg19xApxVkD8BPpPPbDETQ5Hk8',
    authDomain: 'parkingrent-6db89.firebaseapp.com',
    databaseURL:
      'https://parkingrent-6db89-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'parkingrent-6db89',
    storageBucket: 'parkingrent-6db89.appspot.com',
    messagingSenderId: '1037546019431',
    appId: '1:1037546019431:web:42b220c7e0a2ba60cc92c2',
    measurementId: 'G-0YHY3DBCYK'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
