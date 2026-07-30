import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCZxnGQz_kfxr90pJ312xbnHbPgXRHZ1Eg",
    authDomain: "tkb-school.firebaseapp.com",
    projectId: "tkb-school",
    storageBucket: "tkb-school.firebasestorage.app",
    messagingSenderId: "881179203752",
    appId: "1:881179203752:web:d3e4b97c85244019ae0a9d"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);