class FinishPhaseView {
    downloadCompletedTimer(timerKey) {
        let timerElements = Timer.initializeTimerElements;
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/completed-timer.html');
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-completed-wrapper')[0]);
        finishPhaseView.removeEstimation();
        finishPhaseController.transitFinishPhaseData(timerKey);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
        timer.addBorderColor(timerElements.introCompletedWrap[0], borderColorIndex);
    }

    removeEstimation() {
        try {
            document.getElementsByClassName('pomodoros')[0].classList.add('non-visible-elem');
        } catch (e) {
            return 'element is deleted'
        }
    }
}

let finishPhaseView = new FinishPhaseView();