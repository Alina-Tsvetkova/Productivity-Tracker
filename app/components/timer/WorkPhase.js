class WorkPhase {
    static startPomodora() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.timerOver);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        timerElements.activeTimer = document.getElementsByClassName('active-timer')[0];
        timer.initializeTimerElements();
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhase.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhase.failPomodora);
        timer.addAnimationToTimerComponents();
        timer.addRunningAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);

        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(document.getElementsByClassName('timer-block')[0], borderColorIndex);
    }

    receiveDurationOfTimer() {
        let workTimeDuration;
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/cycle').on('value', function (data) {
            workTimeDuration = data.val().workTime;
        });
        for (let j = 0; j < arguments.length; j++) {
            arguments[j].style.animationDuration = workTimeDuration * 60 + 's';
        }
        document.getElementsByClassName('q-minutes')[0].innerHTML = workTimeDuration;
    }

    finishPomodora() { // break starts
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
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('fail-pomodoro');
        breakTimerAttempts++;
        if (breakTimerAttempts === timerAttempts) {
            finishPhase.failTask();
        }
    }
}

let workPhase = new WorkPhase();