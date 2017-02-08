let breakTimerAttempts = 0;
let timerElements = {};
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
        ElementsListener.listenToEvents('click', document.getElementsByClassName('prev-btn'), TaskList.moveToTaskList);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('next-arrow'), Reports.downloadReports);
        timer.initializeTimerElements();
        timer.addTaskInformation(timerKey);
        Router.iconLinksBinder();
    }

    addTaskInformation(taskKey) {
        try {
            firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + taskKey).on('value', function (data) {
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
            });
        } catch (e) {
            return 'unable to send data';
        }
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
        timerElements.timerContainer.removeChild(document.getElementById('intro-timer'));
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        timer.initializeTimerElements();
        timer.addAnimationToTimerComponents();
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhase.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhase.failPomodora);
        workPhase.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        let borderColorIndex = timer.receiveColorIndex(timerKey);
        timer.addBorderColor(document.getElementsByClassName('timer-block')[0], borderColorIndex);
    }

    initializeTimerElements() {
        timerElements.timerContainer = document.getElementsByClassName('timer-content')[0];
        timerElements.activeTimer = document.getElementsByClassName('active-timer')[0];
        timerElements.timerRotator = document.getElementsByClassName('rotator')[0];
        timerElements.timerInvader = document.getElementsByClassName('invader')[0];
        timerElements.timerDivider = document.getElementsByClassName('dimElem')[0];
        timerElements.finishPomodoraButton = document.getElementsByClassName('finish-pomodora-btn');
        timerElements.failPomodoraButton = document.getElementsByClassName('fail-pomodora-btn');
        timerElements.finishTaskButton = document.getElementsByClassName('finish-task-btn');
        timerElements.startPomodoraButton = document.getElementsByClassName('start-pomodora-btn');
        timerElements.breakTimer = document.getElementsByClassName('break-timer')[0];
        timerElements.pomodoroAttempts = document.getElementsByClassName('pomodoro');
        timerElements.timerOver = document.getElementsByClassName('timer-break')[0];
        timerElements.breakButtons = document.getElementsByClassName('break-buttons')[0];
    }

    addAnimationToTimerComponents() {
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
