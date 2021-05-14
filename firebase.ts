import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCHg4jPd3jld4itaYLN6qDeaQBPdUjmmOI",
  authDomain: "whatsapp-e4b36.firebaseapp.com",
  projectId: "whatsapp-e4b36",
  storageBucket: "whatsapp-e4b36.appspot.com",
  messagingSenderId: "261026846780",
  appId: "1:261026846780:web:e82917e7b3af95eca58b39",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
