import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAWs3QyZdGZuBDknlD6l8dJHHh0Xi4oHig",
    authDomain: "garage-app-56459.firebaseapp.com",
    databaseURL: "https://garage-app-56459-default-rtdb.firebaseio.com",
    projectId: "garage-app-56459",
    storageBucket: "garage-app-56459.appspot.com",
    messagingSenderId: "1046287181228",
    appId: "1:1046287181228:web:474c92c0cf39b03cd24609"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth();