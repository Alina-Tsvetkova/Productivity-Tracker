class FinishPhase {
    static completeTask() {
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        FinishPhase.downloadCompletedTimer(timerKey);
    }

    finishTask(taskKey) {
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        timer.downloadCompletedTimer(taskKey);
        for (let k = 0; k < timerElements.pomodoroAttempts.length; k++) {
            timerElements.pomodoroAttempts[k].classList.add('finish-pomodoro');
        }
    }

    static failTask() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/failed-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-failed-wrapper')[0]);
    }

    static downloadCompletedTimer(taskKey) {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/completed-timer.html');
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-completed-wrapper')[0]);
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-completed');
        document.getElementsByClassName('pomodoros')[0].classList.add('non-visible-elem');
        finishPhase.sendDataTaskDone(taskKey);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(document.getElementsByClassName('intro-completed')[0], borderColorIndex);
    }

    sendDataTaskDone(taskKey) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + taskKey).update({
            taskIsDone: true
        });
    }
}

let finishPhase = new FinishPhase();