import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import React from 'react';
import firebaseConfig from '../firebaseConfig.json';

const FirebaseContext = React.createContext(null);

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.functions = firebase.functions();
    this.getYearConfig = this.functions.httpsCallable('getYearConfig');
  }

  sendPasswordResetEmail = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  getUserEmail = () => {
    if (this.auth.currentUser !== null) {
      return this.auth.currentUser.email;
    } else {
      return null;
    }
  };

  checkSignedIn = callback => {
    const unsubscriber = this.auth.onAuthStateChanged(user => {
      const val = user !== null ? true : false;
      callback(val);
    });
    return unsubscriber;
  };

  signIn = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  createAccount = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  signInAnonymously = async () => {
    await this.auth.signInAnonymously();
  };

  signOut = async () => {
    await this.auth.signOut();
  };

  updateConfirmation = async confirmed => {
    // Update user doc
    const ref2 = this.firestore
      .collection('years')
      .doc('2020')
      .collection('users')
      .doc(this.auth.currentUser.uid);
    await ref2.update({ confirmed: confirmed });
  };

  getDashboardData = callback => {
    const ref = this.firestore
      .collection('years')
      .doc('2020')
      .collection('users')
      .doc(this.auth.currentUser.uid);
    const unsubscriber = ref.onSnapshot(snap => {
      console.log('User data updated!');
      const d = snap.data();
      const initials =
        d.firstName.substr(0, 1).toUpperCase() +
        d.lastName.substr(0, 1).toUpperCase();
      const retData = {
        initials: initials,
        name: `${d.firstName.charAt(0).toUpperCase() +
          d.firstName.slice(1)} ${d.lastName.charAt(0).toUpperCase() +
          d.lastName.slice(1)}`,
        email: d.email,
        code: d.code,
        accepted: d.accepted,
        confirmed: d.confirmed,
        checkedIn: d.checkedIn,
        applicationType:
          d.applicationType.charAt(0).toUpperCase() + d.applicationType.slice(1)
      };
      callback(retData);
    });
    return unsubscriber;
  };

  getSchedule = callback => {
    const ref = this.firestore
      .collection('years')
      .doc('2020')
      .collection('events')
      .orderBy('start');
    const unsubscriber = ref.onSnapshot(snap => {
      console.log('Events updated!');
      let events = [];
      snap.forEach(doc => {
        events.push(doc.data());
      });
      callback(events);
    });
    return unsubscriber;
  };
}

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default Firebase;

export { FirebaseContext, withFirebase };
