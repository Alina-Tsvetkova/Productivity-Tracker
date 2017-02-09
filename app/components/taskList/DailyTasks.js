class DailyTasks {
    restrictDailyTasks() {
        TaskNotification.createNotification('.message-restricted');
    }

    moveTaskToDaily(key) {
        if (document.querySelectorAll('#daily-tasks .task').length >= 3) {
            dailyTask.restrictDailyTasks();
            return false;
        }
        dailyTask.sendDailyTaskData(key, productivityManager.addDefaultData());
    }

    sendDailyTaskData(key, date) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + key).update({
            taskIsDone: "pending",
            deadline: date
        });

        setTimeout(function () {
            tasksRenderer.checkIfTaskListEmpty();
        }, 100);

    }
}

let dailyTask = new DailyTasks();