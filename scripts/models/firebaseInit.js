import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAd6QpppZz7hBlKxQf7q1VRZqR9rkuGcTs",
    authDomain: "school-day-app.firebaseapp.com",
    databaseURL: "https://school-day-app.firebaseio.com",
    projectId: "school-day-app",
    storageBucket: "school-day-app.appspot.com",
    messagingSenderId: "408893148329",
    appId: "1:408893148329:web:7d2d571997cb534503adb8",
    measurementId: "G-4KHBJNJXLN",
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
