import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAoRHpB9DwSv2mPhZQ3_aROnjL7MRrbMQo",
  authDomain: "questionnaire-bk-um.firebaseapp.com",
  projectId: "questionnaire-bk-um",
  storageBucket: "questionnaire-bk-um.appspot.com",
  messagingSenderId: "175877645852",
  appId: "1:175877645852:web:53610d017fbb1a7d2ce1d9"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);