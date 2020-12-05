import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyC7uHuBobSoeTMpdSZY6Wi4wg-zMuzOiW0",
  authDomain: "react-slack-clone-7ef91.firebaseapp.com",
  databaseURL: "https://react-slack-clone-7ef91.firebaseio.com",
  projectId: "react-slack-clone-7ef91",
  storageBucket: "react-slack-clone-7ef91.appspot.com",
  messagingSenderId: "55275488688",
  appId: "1:55275488688:web:9a921d12809614ad58c275"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;