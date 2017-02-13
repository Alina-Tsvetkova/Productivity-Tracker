class BreakController {

    addBreakAnimationDuration(elem1, elem2, elem3, breakTimeDuration) {
        alert(breakTimeDuration);
        let timerElements = Timer.initializeTimerElements;
        for (let j = 0; j < arguments.length - 1; j++) {
            arguments[j].style.animationDuration = breakTimeDuration * 60 + 's';
        }
        timerElements.timerMinutes.innerHTML = breakTimeDuration;
    }

    subscribeBreakEvents() {
        let timerElements = Timer.initializeTimerElements;
        ElementsListener.listenToEvents('click', timerElements.finishTaskButton, function () {
            finishPhaseController.finishTask(timerKey)
        });
        ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, workPhaseController.startPomodora);
    }

    transferTimeOfBreak(elem1, elem2, elem3) {
        let breakDuration =  breakModel.receiveTimeOfBreak(elem1, elem2, elem3);
        setTimeout(function () {
            breakPhaseView.notifyBreakOver();
        }, breakDuration * 1000 * 60)
    }
}

let breakController = new BreakController();