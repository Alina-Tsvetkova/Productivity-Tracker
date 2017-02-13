class BreakPhaseView {
    startBreak() {
        breakPhaseView.downloadBreakComponent();
        breakController.subscribeBreakEvents();
        timer.addAnimationToTimerComponents();
        let timerElements = Timer.initializeTimerElements;

        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);

        breakController.transferTimeOfBreak(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
    }

    downloadBreakComponent() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-timer.html');
        let timerElements = Timer.initializeTimerElements;
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('break-timer')[0]);
    }

    downloadBreakOverComponent() {
        let timerElements = Timer.initializeTimerElements;
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-over-timer.html');
        Timer.clearTimerElements(timerElements.breakTimer, document.getElementsByClassName('timer-break-running')[0]);
        timerElements.breakTimer.insertBefore(receivedElem.getElementsByClassName('timer-break')[0], timerElements.breakButtons);
    }

     notifyBreakOver() {
        let timerElements = Timer.initializeTimerElements;
        breakPhaseView.downloadBreakOverComponent();
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
        timer.addBorderColor(timerElements.breakWrap[0], borderColorIndex);
    }
}

let breakPhaseView = new BreakPhaseView();