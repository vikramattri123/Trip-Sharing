import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPBaAJeE9uFtqmFrS2BYA3l6tR2pNNc3g",
  authDomain: "auth-react-df5c4.firebaseapp.com",
  databaseURL: "https://auth-react-df5c4-default-rtdb.firebaseio.com",
  projectId: "auth-react-df5c4",
  storageBucket: "auth-react-df5c4.appspot.com",
  messagingSenderId: "201084072856",
  appId: "1:201084072856:web:9e2d3b1072bbf7a4e0b1ed",
  measurementId: "G-S4LFQT0THK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);