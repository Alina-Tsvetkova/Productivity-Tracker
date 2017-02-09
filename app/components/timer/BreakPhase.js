class BreakPhase {
    startBreak() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-timer.html');
        let timerElements = Timer.initializeTimerElements;
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('break-timer')[0]);
        ElementsListener.listenToEvents('click', timerElements.finishTaskButton, function () {
            finishPhase.finishTask(timerKey)
        });
        ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, WorkPhase.startPomodora);
        timer.addAnimationToTimerComponents();

        let breakDuration = breakPhase.receiveTimeOfBreak(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);
        setTimeout(function () {
            BreakPhase.notifyBreakOver();
        }, breakDuration * 1000 * 60)
    }

    receiveTimeOfBreak() {
        let breakTimeDuration;
        let timerElements = Timer.initializeTimerElements;
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/cycle').on('value', function (data) {
            breakTimeDuration = data.val().shortBreak;
        });
        for (let j = 0; j < arguments.length; j++) {
            arguments[j].style.animationDuration = breakTimeDuration * 60 + 's';
        }
        timerElements.timerMinutes.innerHTML = breakTimeDuration;
        return breakTimeDuration;
    }

    static notifyBreakOver() {
        let timerElements = Timer.initializeTimerElements;
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-over-timer.html');
        Timer.clearTimerElements(timerElements.breakTimer, document.getElementsByClassName('timer-break-running')[0]);
        timerElements.breakTimer.insertBefore(receivedElem.getElementsByClassName('timer-break')[0], timerElements.breakButtons);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
        timer.addBorderColor(timerElements.breakWrap[0], borderColorIndex);
    }
}

let breakPhase = new BreakPhase();