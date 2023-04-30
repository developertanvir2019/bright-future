// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3R7GmYg-oNC4-l_P3UYh0DACjwcWjpYo",
    authDomain: "brightonece.firebaseapp.com",
    projectId: "brightonece",
    storageBucket: "brightonece.appspot.com",
    messagingSenderId: "233668343323",
    appId: "1:233668343323:web:f0de405ae17858d7c9eabe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;