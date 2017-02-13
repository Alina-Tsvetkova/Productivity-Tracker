class FinishPhaseController {
    completeTask() {
        let timerElements = Timer.initializeTimerElements;
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        finishPhaseView.downloadCompletedTimer(timerKey);
        breakTimerAttempts = 0;
    }

    finishTask(timerKey) {
        let timerElements = Timer.initializeTimerElements;
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        finishPhaseView.downloadCompletedTimer(timerKey);

        breakTimerAttempts = 0;
    }

    failTask() {
        let timerElements = Timer.initializeTimerElements;
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/failed-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-failed-wrapper')[0]);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
        timer.addBorderColor(timerElements.failedWrap[0], borderColorIndex);
        finishPhaseModel.sendDataTaskFailed(timerKey);
        finishPhaseView.removeEstimation();
        breakTimerAttempts = 0;
    }

    addStartPomodoraBtn() {
        let timerElements = Timer.initializeTimerElements;
        classManager.removeClass(timerElements.startPomodoraButton[0], 'non-visible-elem');
        ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, workPhaseController.startPomodora);
    }

    receiveDateOfTaskFinish() {
        return new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
    }

    transitFinishPhaseData(timerKey) {
        finishPhaseModel.sendDataTaskDone(timerKey);
    }
}

let finishPhaseController = new FinishPhaseController();