// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import firebase from "firebase/app";
import "firebase/firestore";


// import { collection } from "firebase/firestore";
import { collection, addDoc,getDocs } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJWuU6V2IHo3fq_gRB1puaFwvUTpA9Un0",
  authDomain: "socialmediaapp-e1c76.firebaseapp.com",
  projectId: "socialmediaapp-e1c76",
  storageBucket: "socialmediaapp-e1c76.appspot.com",
  messagingSenderId: "1094735139606",
  appId: "1:1094735139606:web:2f3c82abe80e8524923637"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const googleAuthProvider =new GoogleAuthProvider();
 const auth= getAuth(app);

// const db = firebase.firestore();
const db = getFirestore(app);
 const storage = getStorage(app);
//  const db = firebase.firestore();
 

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data().first}`);
// });


 export {app, auth,googleAuthProvider,db,storage};