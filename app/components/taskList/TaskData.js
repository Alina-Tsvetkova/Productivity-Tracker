class TaskData {
    filterToDoTasks() {
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').limitToLast(5);
        taskData.orderByChild("taskIsDone").equalTo(false).once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                tasksRenderer.renderTask(childData, key);
            });
        });
        Binder.downloadPlugins();
    }

    filterDoneTasks() {
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').limitToLast(5);
        taskData.orderByChild("taskIsDone").equalTo(true).once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                tasksRenderer.renderTask(childData, key);
            });
        });
    }

    filterPendingTasks() {
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').limitToLast(5);
        taskData.orderByChild("taskIsDone").equalTo("pending").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                tasksRenderer.renderTask(childData, key);
            });
        });
    }
}

let taskDataObj = new TaskData();