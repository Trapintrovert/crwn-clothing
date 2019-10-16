import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBfg_Hr7s1mOxAYeKBTW4zw4RaREVQ9WY0",
    authDomain: "crwn-db-f3790.firebaseapp.com",
    databaseURL: "https://crwn-db-f3790.firebaseio.com",
    projectId: "crwn-db-f3790",
    storageBucket: "crwn-db-f3790.appspot.com",
    messagingSenderId: "753791409476",
    appId: "1:753791409476:web:29383783aa13fd36d5cb11"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;