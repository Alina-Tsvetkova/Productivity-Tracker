class WorkPhase {
    static startPomodora() {
        let timerElements = Timer.initializeTimerElements;
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer, timerElements.timerOver);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhase.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhase.failPomodora);
        timer.addAnimationToTimerComponents();
        timer.addRunningAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);
    }

    receiveDurationOfTimer() {
        let workTimeDuration;
        let timerElements = Timer.initializeTimerElements;
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/cycle').on('value', function (data) {
            workTimeDuration = data.val().workTime;
        });

        try {
            for (let j = 0; j < arguments.length; j++) {
                arguments[j].style.animationDuration = workTimeDuration * 60 + 's';
            }
        } catch (e) {
            return "element is undefined";
        }

        timerElements.timerMinutes.innerHTML = workTimeDuration;
    }

    finishPomodora() { // break starts
        let timerElements = Timer.initializeTimerElements;
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('finish-pomodoro');
        breakTimerAttempts++;
        if (breakTimerAttempts === timerAttempts) {
            FinishPhase.completeTask();
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        }
        else {
            breakPhase.startBreak();
        }
    }

    failPomodora() {
        let timerElements = Timer.initializeTimerElements;
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('fail-pomodoro');
        breakTimerAttempts++;
        console.log(breakTimerAttempts, timerAttempts);
        if (breakTimerAttempts === timerAttempts) {
            FinishPhase.failTask();
        }
        finishPhase.addStartPomodoraBtn();

        try {
            timerElements.failPomodoraButton[0].classList.add('non-visible-elem');
            timerElements.finishTaskButton[0].classList.add('non-visible-elem');
        } catch (e) {
            return 'element is already removed'
        }

    }
}

let workPhase = new WorkPhase();