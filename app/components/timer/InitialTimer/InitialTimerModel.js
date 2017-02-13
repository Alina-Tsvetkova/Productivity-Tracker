class InitialTimerModel {
    addTaskInformation(taskKey) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + taskKey).on('value', function (data) {
            let taskTitle = data.val().title;
            let taskDescription = data.val().description;
            let taskEstimation = data.val().estimation;
            initialTimerController.transferInfoForRender(taskKey, taskTitle, taskDescription, taskEstimation);
        });
    }
}

let initialTimerModel = new InitialTimerModel();