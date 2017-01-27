var config = {
    apiKey: "AIzaSyALV2gkAMZQtLGhc9dxH_OQMnPW_-2GUfI",
    authDomain: "productivity-tracker-1ed79.firebaseapp.com",
    databaseURL: "https://productivity-tracker-1ed79.firebaseio.com",
    storageBucket: "productivity-tracker-1ed79.appspot.com",
    messagingSenderId: "61959526681"
};
firebase.initializeApp(config);

let allTasksToDo = firebase.database().ref("tasksToDo");

let allTasksDone = firebase.database().ref("tasksDone");
//allTasksDone.push({
//    title: 'Add slider',
//    description: 'Add slider to my web-site',
//    category: 'JavaScript',
//    deadline: '20.12.2016',
//    estimation: '4',
//    priority: 'Middle',
//    color_indicator: '1',
//    taskisdone: 'true',
//    dailyTask: false
//})

let tasks = firebase.database();

let reports = firebase.database().ref("reports");

let categories = firebase.database().ref("categories");


