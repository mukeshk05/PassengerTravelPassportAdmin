// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBagiOPQ94u_rP8xqlk0QWYEVNM63POkDs",
  authDomain: "iatatravelpass-c75ab.firebaseapp.com",
  databaseURL: "https://iatatravelpass-c75ab-default-rtdb.firebaseio.com",
  projectId: "iatatravelpass-c75ab",
  storageBucket: "iatatravelpass-c75ab.appspot.com",
  messagingSenderId: "867130732373",
  appId: "1:867130732373:web:8590d282b30c1eced509dc",
};

// function initializeAppIfNecessary() {
//   try {
//     return getApp();
//   } catch (any) {
//     const firebaseConfig = {
//       apiKey: "AIzaSyBjbgb8t9otvRF88Qn7DDBHBje6APxYmtM",
//       authDomain: "iatatravelpass-94901.firebaseapp.com",
//       databaseURL: "https://iatatravelpass-94901-default-rtdb.firebaseio.com",
//       projectId: "iatatravelpass-94901",
//       storageBucket: "iatatravelpass-94901.appspot.com",
//       messagingSenderId: "187255851345",
//       appId: "1:187255851345:web:7bfb47b7f63fa9e2ecab70",
//     };
//     return initializeApp(firebaseConfig);
//   }
// }
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firebaseDatabase = getDatabase(app);
const firebaseStorage = getStorage(app);
export { app, firebaseDatabase, firebaseStorage };
