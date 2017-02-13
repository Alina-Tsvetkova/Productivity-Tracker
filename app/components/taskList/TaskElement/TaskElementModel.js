class TaskElementModel {
    filterTasks(field, value) {
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').limitToLast(5);
        taskData.orderByChild(field).equalTo(value).once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                console.log(key,childData);
                let docTask = taskElementView.downloadTaskComponent();
                taskElementView.fillTaskWithInformation(docTask,childData, key);
            });
        });
        Binder.downloadPlugins();
    }
}

let taskElementModel  = new TaskElementModel();