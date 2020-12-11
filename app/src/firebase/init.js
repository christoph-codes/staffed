import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Init firebase 
var config = {
  apiKey: "AIzaSyDAaQO9fxhAkk0GrQsHlApYSkZASWtsrYk",
  authDomain: "staffed-app.firebaseapp.com",
  databaseURL: "https://staffed-app.firebaseio.com",
  projectId: "staffed-app",
  storageBucket: "staffed-app.appspot.com",
  messagingSenderId: "68511972005"

};

const firebaseApp = firebase.initializeApp(config);

// export firestore database
export default firebaseApp.firestore()
