class TaskElementModel {
    filterTasks(field, value) {
        let taskData = firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').limitToLast(5);
        taskData.orderByChild(field).equalTo(value).once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = snapshot.val();
                let key = childSnapshot.key;
                let docTask = taskElementView.downloadTaskComponent();
                taskElementView.fillTaskWithInformation(docTask, childData, key);
            });
        });
        Binder.downloadPlugins();
    }

    sendSubmittedData(postData) {
        firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').push(postData);
        taskElementController.checkIfTaskListEmpty();
    }

    sendEditedData(updates, editedHash) {
        firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + editedHash).update(updates);
        taskElementController.checkIfTaskListEmpty();
    }

    sendTodayTask(key) {
        let today = taskElementController.addDefaultData();
        firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + key).update({
            deadline: today
        });
        taskElementController.checkIfTaskListEmpty();
    }

    filterDataBase() {
        let taskData = firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks');
        taskData.on('value', function (snapshot) {
            snapshot.forEach(function (child) {
                let value = child.val();

                if (event.target.innerHTML == child.val().priority) {
                    let docTask = taskElementView.downloadTaskComponent();
                    taskElementView.fillTaskWithInformation(docTask, value, child.key, true);
                }
                else if (event.target.innerHTML == 'All') {
                    taskElementController.checkIfTaskListEmpty();
                }
            });
        });
    }
}

let taskElementModel = new TaskElementModel();