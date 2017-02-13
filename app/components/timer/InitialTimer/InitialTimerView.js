class InitialTimerView {
    showTimer(taskKey) {
        Router.addHash("timer");
        timerKey = taskKey;
        let timerBinder = new Binder('app/components/timer/timer.html', document.body);
        timerBinder.downloadComponent();
        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
        initialTimerView.downloadIntroTimer();
        ElementsListener.listenToEvents('click', document.getElementsByClassName('start-timer'), initialTimerView.downloadStartTimer);

        initialTimerController.transitTaskInformation(timerKey);

        Icons.downloadMainIcons();
        Icons.iconLinksBinder();
    }

    downloadIntroTimer() {
        let timerIntroBinder = new Binder('app/components/timer/timer-states/intro-timer.html');
        let receivedDocIntroTimer = timerIntroBinder.downloadComponent();
        document.getElementsByClassName('timer-content')[0].appendChild(receivedDocIntroTimer.getElementById('intro-timer'));
    }

    downloadStartTimer() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        let timerElements = Timer.initializeTimerElements;
        timerElements.timerContainer.removeChild(document.getElementById('intro-timer'));
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        timer.addAnimationToTimerComponents();
        initialTimerController.subscribeStartTimerEvents(timerElements);
        workPhaseModel.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);
    }

    renderTaskInformation(taskKey, taskTitle, taskDescription,taskEstimation) {
        document.getElementsByClassName('task-title-timer')[0].innerHTML = taskTitle;
        document.getElementsByClassName('task-description-timer')[0].innerHTML = taskDescription;
        let estimationList = document.getElementsByClassName('pomodoros')[0];
        timerAttempts = taskEstimation;
        for (let j = 0; j < timerAttempts; j++) {
            let estimationListElem = document.createElement('li');
            estimationListElem.classList.add('pomodoro');
            estimationList.appendChild(estimationListElem);
        }

        let borderColorIndex = timer.receiveColorIndex(taskKey);
        timer.addBorderColor(document.getElementsByClassName('intro-slog')[0], borderColorIndex);
    }
}

let initialTimerView = new InitialTimerView();