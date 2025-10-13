// Importar funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración del proyecto web Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrv5H943iXHyn3_Fd3SnR20Xma2sxAYnU",
  authDomain: "emonical-foro.firebaseapp.com",
  projectId: "emonical-foro",
  storageBucket: "emonical-foro.appspot.com",
  messagingSenderId: "536879951153",
  appId: "1:536879951153:web:241128514fe77bed065410",
  measurementId: "G-Z7PJTLE802"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
