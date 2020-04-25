import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTR7W3G9B4rG_I6gXF49707GOutqfT4Gc",
  authDomain: "beforetea-2821a.firebaseapp.com",
  databaseURL: "https://beforetea-2821a.firebaseio.com",
  projectId: "beforetea-2821a",
  storageBucket: "beforetea-2821a.appspot.com",
  messagingSenderId: "401919675808",
  appId: "1:401919675808:web:967ef51a7cd105a412a8c5",
  measurementId: "G-SWGDMSB42C"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
