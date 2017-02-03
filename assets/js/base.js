var config = {
    apiKey: "AIzaSyALV2gkAMZQtLGhc9dxH_OQMnPW_-2GUfI",
    authDomain: "productivity-tracker-1ed79.firebaseapp.com",
    databaseURL: "https://productivity-tracker-1ed79.firebaseio.com",
    storageBucket: "productivity-tracker-1ed79.appspot.com",
    messagingSenderId: "61959526681"
};
firebase.initializeApp(config);

let tasks = firebase.database();
let users = firebase.database().ref("users");




