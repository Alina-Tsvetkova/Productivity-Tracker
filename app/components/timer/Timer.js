let breakTimerAttempts = 0;
let timerKey;
let timerAttempts;

class Timer {
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
            introCompletedWrap: document.getElementsByClassName('timer-completed-wrapper'),
            failedWrap: document.getElementsByClassName('timer-failed-wrapper'),
            breakWrap: document.getElementsByClassName('timer-break-wrapper'),
            timerMinutes: document.getElementsByClassName('q-minutes')[0]
        }
    }

    receiveColorIndex(timerKey) {
        try {
            let borderColorIndex;
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + timerKey).on('value', function (data) {
                borderColorIndex = data.val().colorIndicator;
            });
            return borderColorIndex;
        } catch (e) {
            return "element is already null";
        }
    }

    addBorderColor(element, value) {
        let borderColors = ['#ffb200', '#59abe3', '#9849b8', '#e16c65', '#00d4d9'];
        try {
            element.style.borderColor = borderColors[value];
        }
        catch (e) {
            return 'no element to add border';
        }

        return borderColors[value];
    }

    downloadTimerComponents(route) {
        let timerElement = new Binder(route);
        return timerElement.downloadComponent();
    }


    addAnimationToTimerComponents() {
        let timerElements = Timer.initializeTimerElements;
        timerElements.timerRotator.style.animation = 'rotateTimer linear 1 forwards';
        timerElements.timerInvader.style.animation = 'animateOpacity steps(1, end) 1 reverse forwards';
        timerElements.timerDivider.style.animation = 'animateOpacity steps(1, end) 1 forwards';
        workPhaseModel.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
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
