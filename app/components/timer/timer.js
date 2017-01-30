let breakTimerAttempts = 0;
let timerElements = {}
let finishTaskAttempts = 0;
let timerKey;

class Timer {
    static showTimer(key) {
        timerKey=key;
        let timerBinder = new Binder('app/components/timer/timer.html', document.body);
        let receivedDoc = timerBinder.downloadComponent();
        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
        let timerIntroBinder = new Binder('app/components/timer/timer-states/intro-timer.html');
        let receivedDocIntroTimer = timerIntroBinder.downloadComponent();
        document.getElementsByClassName('timer-content')[0].appendChild(receivedDocIntroTimer.getElementById('intro-timer'));
        ElementsListener.listenToEvents('click', document.getElementsByClassName('start-timer'), timer.startTimer);
        timer.initializeTimerElements();
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + key);
        taskData.on('value', function (data) {
            let value = data.val();
            document.getElementsByClassName('task-title-timer')[0].innerHTML = value.title;
            document.getElementsByClassName('task-description-timer')[0].innerHTML = value.description;
        });

    }

    downloadTimerComponents(route) {
        let timerElement = new Binder(route);
        let receivedDocTimer = timerElement.downloadComponent();
        return receivedDocTimer;
    }

    startTimer() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        timerElements.timerContainer.removeChild(document.getElementById('intro-timer'));
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        timer.initializeTimerElements();
        timer.addAnimationToTimerComponents();
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, timer.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, timer.failPomodora);
        timer.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
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

    finishPomodora() { // break starts
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('finish-pomodoro');
        breakTimerAttempts++;
        //let degRotated = window.getComputedStyle(timerElements.timerRotator, null);
        //let rotationDeg = degRotated.getPropertyValue("transform");
        if (breakTimerAttempts === 3) {
            timer.completeTask();
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        }
        else {
            timer.startBreak();
        }
    }

    failPomodora() {
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('fail-pomodoro');
        breakTimerAttempts++;
        if (breakTimerAttempts === 3) {
            timer.failTask();
        }
    }

    failTask() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/failed-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-failed-wrapper')[0]);
    }

    startBreak() {
        //matrix(1, -2.44929e-16, 2.44929e-16, 1, 0, 0)
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('break-timer')[0]);
        timer.initializeTimerElements();
        ElementsListener.listenToEvents('click', timerElements.finishTaskButton, timer.finishTask(timerKey));
        ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, timer.startPomodora);
        timer.addAnimationToTimerComponents();

        setTimeout(function () {
            //let degRotated = window.getComputedStyle(timerElements.timerRotator, null);
            //let rotationDeg = degRotated.getPropertyValue("transform");
            //console.log(rotationDeg);
            timer.notifyBreakOver();
        }, 10000)
    }

    notifyBreakOver() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-over-timer.html');
        Timer.clearTimerElements(timerElements.breakTimer, document.getElementsByClassName('timer-break-running')[0]);
        timerElements.breakTimer.insertBefore(receivedElem.getElementsByClassName('timer-break')[0], timerElements.breakButtons);
        timer.initializeTimerElements();
    }

    addAnimationToTimerComponents() {
        timerElements.timerRotator.style.animation = 'rotateTimer linear 1 forwards';
        timerElements.timerInvader.style.animation = 'animateOpacity steps(1, end) 1 reverse forwards';
        timerElements.timerDivider.style.animation = 'animateOpacity steps(1, end) 1 forwards';
        timer.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
    }

    receiveDurationOfTimer() {
        for (let j = 0; j < arguments.length; j++) {
            arguments[j].style.animationDuration = '10s';
        }
    }

    startPomodora() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.timerOver);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        timerElements.activeTimer = document.getElementsByClassName('active-timer')[0];
        timer.initializeTimerElements();
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, timer.finishPomodora);
        ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, timer.failPomodora);
        timer.addAnimationToTimerComponents();
        timer.addRunningAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
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

    completeTask() {
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timer.downloadActiveTimer();
    }

    finishTask(timerKey) {
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        timer.downloadActiveTimer();
        for (let k = 0; k < timerElements.pomodoroAttempts.length; k++) {
            timerElements.pomodoroAttempts[k].classList.add('finish-pomodoro');
        }
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).update({'taskisdone':true});
    }

    downloadActiveTimer() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/completed-timer.html');
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-completed-wrapper')[0]);
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-completed');
    }


    static clearTimerElements(parent, child) {
        try {
            parent.removeChild(child);
        }
        catch (e) {
            console.log('element is already removed');
        }

    }
}

let timer = new Timer();
