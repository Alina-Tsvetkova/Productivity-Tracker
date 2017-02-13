class WorkPhaseController {
     startPomodora() {
        let timerElements = Timer.initializeTimerElements;
        workPhaseView.downloadWorkPhaseComponent(timerElements);
        workPhaseController.subscribeWorkPhaseEvents(timerElements);
        timer.addAnimationToTimerComponents();
        timer.addRunningAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        workPhaseView.addBorder(timerElements, borderColorIndex);
    }


    finishPomodora() { // break starts
        let timerElements = Timer.initializeTimerElements;
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('finish-pomodoro');
        breakTimerAttempts++;
        if (breakTimerAttempts === timerAttempts) {
            finishPhaseController.completeTask();
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        }
        else {
            try {
                breakPhaseView.startBreak();
            } catch (e) {
                return "Module is corrupted or switched off";
            }

        }
    }

    failPomodora() {
        let timerElements = Timer.initializeTimerElements;
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('fail-pomodoro');
        breakTimerAttempts++;

        if (breakTimerAttempts === timerAttempts) {
            finishPhaseController.failTask();
        }
        finishPhaseController.addStartPomodoraBtn();

        try {
            workPhaseView.removeButtons(timerElements);
        } catch (e) {
            return 'element is already removed'
        }

    }

    subscribeWorkPhaseEvents(timerElements) {
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhaseController.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhaseController.failPomodora);
    }


    addWorkAnimationDuration(elem1, elem2, elem3, workTimeDuration) {
        let timerElements = Timer.initializeTimerElements;
        try {
            for (let j = 0; j < arguments.length - 1; j++) {
                arguments[j].style.animationDuration = workTimeDuration * 60 + 's';
            }
        } catch (e) {
            return "element is undefined";
        }
        timerElements.timerMinutes.innerHTML = workTimeDuration;
    }
}

let workPhaseController = new WorkPhaseController();