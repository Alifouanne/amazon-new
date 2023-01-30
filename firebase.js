import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBpBO1_hoPNQQaqVptAlNd42P2ONTQisV4",
  authDomain: "fir-1bfd5.firebaseapp.com",
  projectId: "fir-1bfd5",
  storageBucket: "fir-1bfd5.appspot.com",
  messagingSenderId: "432574369829",
  appId: "1:432574369829:web:6efcf44c67692d3d642fcc",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
