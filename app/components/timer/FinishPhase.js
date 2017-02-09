class FinishPhase {
    static completeTask() {
        let timerElements = Timer.initializeTimerElements;
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        FinishPhase.downloadCompletedTimer(timerKey);
        breakTimerAttempts = 0;
    }

    finishTask(timerKey) {
        let timerElements = Timer.initializeTimerElements;
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        FinishPhase.downloadCompletedTimer(timerKey);
        for (let k = 0; k < timerElements.pomodoroAttempts.length; k++) {
            timerElements.pomodoroAttempts[k].classList.add('finish-pomodoro');
        }
        breakTimerAttempts = 0;
    }

    static failTask() {
        let timerElements = Timer.initializeTimerElements;
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/failed-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-failed-wrapper')[0]);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
        timer.addBorderColor(timerElements.failedWrap[0], borderColorIndex);
        finishPhase.sendDataTaskFailed(timerKey);
        FinishPhase.removeEstimation();
        breakTimerAttempts = 0;
    }

    addStartPomodoraBtn() {
        let timerElements = Timer.initializeTimerElements;
        classManager.removeClass(timerElements.startPomodoraButton[0], 'non-visible-elem');
        ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, WorkPhase.startPomodora);

    }

    static downloadCompletedTimer(timerKey) {
        let timerElements = Timer.initializeTimerElements;
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/completed-timer.html');
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-completed-wrapper')[0]);
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-completed');
        FinishPhase.removeEstimation();
        finishPhase.sendDataTaskDone(timerKey);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
        timer.addBorderColor(timerElements.introCompletedWrap[0], borderColorIndex);

    }

    sendDataTaskFailed(timerKey) {
        let today = finishPhase.receiveDateOfTaskFinish();
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).update({
            taskIsDone: 'failed',
            priority: 'Failed',
            dateOfFinish: today,
        });
    }

    sendDataTaskDone(timerKey) {
        let today = finishPhase.receiveDateOfTaskFinish();
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).update({
            taskIsDone: true,
            dateOfFinish: today
        });
    }

    receiveDateOfTaskFinish() {
        return new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
    }

    static removeEstimation() {
        try {
            document.getElementsByClassName('pomodoros')[0].classList.add('non-visible-elem');
        } catch (e) {
            return 'element is deleted'
        }
    }
}

let finishPhase = new FinishPhase();