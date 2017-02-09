let breakTimerAttempts = 0;
let timerKey;
let timerAttempts;


class Timer {
    static showTimer(taskKey) {
        Router.addHash("timer");
        timerKey = taskKey;
        let timerBinder = new Binder('app/components/timer/timer.html', document.body);
        timerBinder.downloadComponent();
        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
        let timerIntroBinder = new Binder('app/components/timer/timer-states/intro-timer.html');
        let receivedDocIntroTimer = timerIntroBinder.downloadComponent();
        document.getElementsByClassName('timer-content')[0].appendChild(receivedDocIntroTimer.getElementById('intro-timer'));
        ElementsListener.listenToEvents('click', document.getElementsByClassName('start-timer'), timer.startTimer);
        timer.addTaskInformation(timerKey);
        Icons.downloadMainIcons();
        Icons.iconLinksBinder();
    }

    static get initializeTimerElements() {
        return {
            timerContainer: document.getElementsByClassName('timer-content')[0],
            activeTimer: document.getElementsByClassName('active-timer')[0],
            timerRotator: document.getElementsByClassName('rotator')[0],
            timerInvader: document.getElementsByClassName('invader')[0],
            timerDivider: document.getElementsByClassName('dimElem')[0],
            finishPomodoraButton: document.getElementsByClassName('finish-pomodora-btn'),
            failPomodoraButton: document.getElementsByClassName('fail-pomodora-btn'),
            finishTaskButton: document.getElementsByClassName('finish-task-btn'),
            startPomodoraButton: document.getElementsByClassName('start-pomodora-btn'),
            breakTimer: document.getElementsByClassName('break-timer')[0],
            pomodoroAttempts: document.getElementsByClassName('pomodoro'),
            timerOver: document.getElementsByClassName('timer-break')[0],
            breakButtons: document.getElementsByClassName('break-buttons')[0],
            timerBlock: document.getElementsByClassName('timer-block'),
            introCompleted: document.getElementsByClassName('intro-completed'),
            introCompletedWrap:document.getElementsByClassName('timer-completed-wrapper'),
            failedWrap:document.getElementsByClassName('timer-failed-wrapper'),
            breakWrap:document.getElementsByClassName('timer-break-wrapper'),
            timerMinutes:document.getElementsByClassName('q-minutes')[0]
        }
    }

    addTaskInformation(taskKey) {

        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + taskKey).on('value', function (data) {
            try {
                document.getElementsByClassName('task-title-timer')[0].innerHTML = data.val().title;
                document.getElementsByClassName('task-description-timer')[0].innerHTML = data.val().description;
                let estimationList = document.getElementsByClassName('pomodoros')[0];
                timerAttempts = data.val().estimation;
                for (let j = 0; j < timerAttempts; j++) {
                    let estimationListElem = document.createElement('li');
                    estimationListElem.classList.add('pomodoro');
                    estimationList.appendChild(estimationListElem);
                }

                let borderColorIndex = timer.receiveColorIndex(taskKey);
                timer.addBorderColor(document.getElementsByClassName('intro-slog')[0], borderColorIndex);

            } catch (e) {
                return 'unable to send data';
            }
        });
    }

    receiveColorIndex(timerKey) {
        let borderColorIndex;
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).on('value', function (data) {
            borderColorIndex = data.val().colorIndicator;
        });
        return borderColorIndex;
    }

    addBorderColor(element, value) {
        try {
            let borderColors = ['#ffb200', '#59abe3', '#9849b8', '#e16c65', '#00d4d9'];
            element.style.borderColor = borderColors[value];
        }
        catch (e) {
            return 'no element to add border';
        }

    }

    downloadTimerComponents(route) {
        let timerElement = new Binder(route);
        return timerElement.downloadComponent();
    }

    startTimer() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        let timerElements = Timer.initializeTimerElements;
        timerElements.timerContainer.removeChild(document.getElementById('intro-timer'));
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        timer.addAnimationToTimerComponents();
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhase.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhase.failPomodora);
        workPhase.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);
    }

    addAnimationToTimerComponents() {
        let timerElements = Timer.initializeTimerElements;
        timerElements.timerRotator.style.animation = 'rotateTimer linear 1 forwards';
        timerElements.timerInvader.style.animation = 'animateOpacity steps(1, end) 1 reverse forwards';
        timerElements.timerDivider.style.animation = 'animateOpacity steps(1, end) 1 forwards';
        workPhase.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
    }

    addPausedAnimation() {
        for (let j = 0; j < arguments.length; j++) {
            arguments[j].classList.remove('running-animation');
            arguments[j].classList.add('paused-animation');
        }
    }

    addRunningAnimation() {
        for (let j = 0; j < arguments.length; j++) {
            arguments[j].classList.remove('paused-animation');
            arguments[j].classList.add('running-animation');
        }
    }

    static clearTimerElements(parent, child) {
        try {
            parent.removeChild(child);
        }
        catch (e) {
            return 'element is already removed';
        }
    }
}

let timer = new Timer();
