class DailyTasks {
    restrictDailyTasks() {
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-restricted');
    }

    moveTaskToDaily(key) {
        if (document.querySelectorAll('#daily-tasks .task').length >= 3) {
            dailyTask.restrictDailyTasks();
            return false;
        }
        let today = new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + key).update({
            taskIsDone: "pending",
            deadline: today
        });
        tasksRenderer.checkIfTaskListEmpty();
    }
}

let dailyTask = new DailyTasks();