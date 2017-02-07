class DailyTasks {
    restrictDailyTasks() {
        TaskNotification.createNotification('.message-restricted');
    }

    moveTaskToDaily(key) {
        console.log(key);
        if (document.querySelectorAll('#daily-tasks .task').length >= 3) {
            dailyTask.restrictDailyTasks();
            return false;
        }
        dailyTask.sendDailyTaskData(key,productivityManager.addDefaultData());
    }

    sendDailyTaskData(key,date) {
        console.log(key);
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + key).update({
            taskIsDone: "pending",
            deadline: date
        });
        tasksRenderer.checkIfTaskListEmpty();
    }
}

let dailyTask = new DailyTasks();