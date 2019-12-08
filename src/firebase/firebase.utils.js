import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { resolve } from 'dns';


const config = {
    apiKey: "AIzaSyBfg_Hr7s1mOxAYeKBTW4zw4RaREVQ9WY0",
    authDomain: "crwn-db-f3790.firebaseapp.com",
    databaseURL: "https://crwn-db-f3790.firebaseio.com",
    projectId: "crwn-db-f3790",
    storageBucket: "crwn-db-f3790.appspot.com",
    messagingSenderId: "753791409476",
    appId: "1:753791409476:web:29383783aa13fd36d5cb11"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;

};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections)=>{
    const transformedcCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.it,
            title,
            items
        }
    });
    return transformedcCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    } , {})
}


  firebase.initializeApp(config);

  export const getCurrentUser = () => {
      return new Promise((resolve, reject) =>{
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
      });
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;