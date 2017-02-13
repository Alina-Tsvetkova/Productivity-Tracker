class WorkPhaseView {

    downloadWorkPhaseComponent(timerElements) {
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer, timerElements.timerOver);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
    }

    removeButtons(timerElements) {
        timerElements.failPomodoraButton[0].classList.add('non-visible-elem');
        timerElements.finishTaskButton[0].classList.add('non-visible-elem');
    }

    addBorder (timerElements,borderColorIndex) {
        timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);
    }
}

let workPhaseView = new WorkPhaseView();