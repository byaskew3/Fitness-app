import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

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
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
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
    
    /* Database */
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref(`users`);

    addActivity = (uid, activity) => {
        const ref = this.db.ref().child(`users/${uid}/activities`)
        ref.push(activity);
    };

    updateActivity = (uid, activity, activityKey) => {
        const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
        ref.update(activity);
    }
}

export default Firebase;