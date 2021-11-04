import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
    apiKey: "AIzaSyD0LV_HQFORMZVkkGCWolD1Xdk6HRweLyA",
    authDomain: "workout-tracker-9cb42.firebaseapp.com",
    projectId: "workout-tracker-9cb42",
    storageBucket: "workout-tracker-9cb42.appspot.com",
    messagingSenderId: "420623048838",
    appId: "1:420623048838:web:4f61d61f0fde11b31ef107"
  };

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        // this.db = app.database(); Later add database
    }
    
    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);
}

export default Firebase;