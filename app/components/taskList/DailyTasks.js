class DailyTasks {
    moveTaskToDaily() {
        let allRenderedMoveTaskBtns = document.getElementsByClassName('move-task');
        let allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedMoveTaskBtns);
        index = allRenderedEditButtonsArr.indexOf(event.target);
        let key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
        dailyTask.sendDailyData(key);
    }


    sendDailyData(key) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + key).update({
            "dailyTask": true
        });

        tasksRenderer.checkIfTaskListEmpty();
    }

    removeDailyBtn(dataKey) {
        let dailyTasks = document.querySelectorAll('.task[dailytask="true"]');
        console.log(dailyTasks);
        for (let k = 0; k < dailyTasks.length; k++) {
            dailyTasks[k].getElementsByClassName('move-task')[0].classList.add('non-visible-elem');
            dailyTasks[k].getElementsByClassName('edit')[0].classList.add('full-size-btn');
        }
        console.log(dataKey);
    }


}

let dailyTask = new DailyTasks();