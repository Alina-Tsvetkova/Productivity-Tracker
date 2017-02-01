let breakTimerAttempts = 0;
let timerElements = {}
let timerKey;
let estimationOfTask = 0;

class Timer {
    static showTimer(key) {
        timerKey = key;
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
            estimationOfTask = value.estimation;
            document.getElementsByClassName('task-title-timer')[0].innerHTML = value.title;
            document.getElementsByClassName('task-description-timer')[0].innerHTML = value.description;
            document.getElementsByClassName('pomodoros')[0].innerHTML = '';
            for (let j = 0; j < estimationOfTask; j++) {
                let pomodoroLi = document.createElement('li');
                pomodoroLi.classList.add('pomodoro');
                document.getElementsByClassName('pomodoros')[0].appendChild(pomodoroLi);
            }
            if (value.startOfTimer != 0) {
                timer.startTimer(value.startOfTimer);
            }
        });


        Router.iconLinksBinder();
    }

    downloadTimerComponents(route) {
        let timerElement = new Binder(route);
        let receivedDocTimer = timerElement.downloadComponent();
        return receivedDocTimer;
    }

    startTimer(startTimerTime) {
        let rotateDeg;
        (function countCurrentAngelOfTimer() {
            let timeNow = new Date();
            let timeBefore = new Date(startTimerTime);
            let timeDiff = Math.abs(timeNow.getTime() - timeBefore.getTime());
            rotateDeg = (timeDiff / 1000) / (40 * 60) * 360;
        }());
        try {
            let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
            timerElements.timerContainer.removeChild(document.getElementById('intro-timer'));
            timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
            timer.initializeTimerElements();
            timer.addAnimationToTimerComponents();
            let timerStartTime = new Date();
            firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).update({
                'timerIsOn': true
            });
            ElementsListener.listenToEvents('click', timerElements.finishTaskButton, function () {
                timer.finishTask(timerKey)
            });
            ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, function () {
                timer.finishPomodora(timerKey);
            });
            ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, timer.failPomodora);
            timer.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
            document.getElementsByClassName('rotator')[0].style.rotate = rotateDeg + 'deg';
            if (rotateDeg > 180) {
                document.getElementsByClassName('invader')[0].style.animationDuration = 0 + 's';
                document.getElementsByClassName('dimElem')[0].style.animationDuration = 0 + 's';
            }
            if (rotateDeg >= 360) {
                document.getElementsByClassName('rotator')[0].style.rotate = 360 + 'deg';
                timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
            }
            firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).on('value', function (data) {
                console.log(data.val().startOfTimer);
                if (data.val().startOfTimer === 0) {
                    firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).update({
                        startOfTimer: timerStartTime
                    });
                }
            });
        }
        catch (e) {
            return false;
        }
    }

    initializeTimerElements() {
        timerElements.timerContainer = document.getElementsByClassName('timer-content')[0];
        timerElements.activeTimer = document.getElementsByClassName('active-timer')[0];
        timerElements.timerRotator = document.getElementsByClassName('rotator')[0];
        timerElements.timerInvader = document.getElementsByClassName('invader')[0];
        timerElements.timerDivider = document.getElementsByClassName('dimElem')[0];
        timerElements.finishPomodoraButton = document.getElementsByClassName('finish-pomodora-btn');
        timerElements.finishTaskButton = document.getElementsByClassName('finish-task-btn');
        timerElements.failPomodoraButton = document.getElementsByClassName('fail-pomodora-btn');
        timerElements.startPomodoraButton = document.getElementsByClassName('start-pomodora-btn');
        timerElements.breakTimer = document.getElementsByClassName('break-timer')[0];
        timerElements.pomodoroAttempts = document.getElementsByClassName('pomodoro');
        timerElements.timerOver = document.getElementsByClassName('timer-break')[0];
        timerElements.breakButtons = document.getElementsByClassName('break-buttons')[0];
    }

    finishPomodora(timerKey) { // break starts
        timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('finish-pomodoro');
        breakTimerAttempts++;
        if (breakTimerAttempts === estimationOfTask) {
            timer.completeTask(timerKey);
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
        timer.startBreak();
        if (breakTimerAttempts === estimationOfTask) {
            timer.failTask();
        }
    }

    failTask() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/failed-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-failed-wrapper')[0]);
    }

    startBreak() {
        console.log('started break');
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('break-timer')[0]);
        timer.initializeTimerElements();
        ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, timer.startPomodora);
        timer.addAnimationToTimerComponents();

        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/cycle');
        let shortBreakDuration;
        taskData.on('value', function (data) {
            shortBreakDuration = data.val().shortBreak;
            document.getElementsByClassName('q-minutes')[0].innerHTML = shortBreakDuration;
            timer.receiveDurationOfBreak(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider, shortBreakDuration);
            setTimeout(function () {
                timer.notifyBreakOver();
            }, shortBreakDuration * 60 * 1000)
        });

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

    receiveDurationOfBreak(elem1, elem2, elem3, shortBreakDuration) {
        console.log(shortBreakDuration);
        for (let j = 0; j < arguments.length - 1; j++) {
            arguments[j].style.animationDuration = shortBreakDuration * 60 + 's';
        }
    }

    receiveDurationOfTimer() {
        let taskData = firebase.database().ref('users/' + UserData.getUserDataLocally() + '/cycle');
        let workTimerDuration = 0;
        taskData.on('value', function (data) {
            workTimerDuration = data.val().workTime;
        });
        for (let j = 0; j < arguments.length; j++) {
            arguments[j].style.animationDuration = workTimerDuration * 60 + 's';
        }
        document.getElementsByClassName('q-minutes')[0].innerHTML = workTimerDuration;
    }

    startPomodora() {
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.timerOver);
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        timerElements.activeTimer = document.getElementsByClassName('active-timer')[0];
        timer.initializeTimerElements();
        ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, function () {
            timer.finishPomodora(timerKey)
        });
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

    completeTask(timerKey) {
        Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
        timer.downloadCompleteTimer(timerKey);
    }

    finishTask(timerKey) {
        for (let k = 0; k < estimationOfTask; k++) {
            timerElements.pomodoroAttempts[k].classList.add('finish-pomodoro');
        }
        timer.completeTask(timerKey);
    }

    downloadCompleteTimer(timerKey) {
        console.log(timerKey);
        let receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/completed-timer.html');
        timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-completed-wrapper')[0]);
        document.getElementsByClassName('pomodoros')[0].style.display = 'none';
        setTimeout(function () {
            estimationOfTask = 0;
            let newNotification = new TaskNotification();
            newNotification.wrapNotificationFunctionality('.message-completed');
            firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + timerKey).update({
                'taskisdone': true,
                'timerIsOn': false
            });
        }, 1000);
    }


    static clearTimerElements(parent, child) {
        try {
            parent.removeChild(child);
        }
        catch (e) {
            console.log('element is already removed');
        }

    }

    checkIfTimerIsProcessing() {
        let priorityIndicators = document.getElementsByClassName('priority-indicator');
        ElementsListener.listenToEvents('click', priorityIndicators, function (event) {
            let activeTimersOnPage = document.getElementsByClassName('active-task-timer');
            let timersQuantity = activeTimersOnPage.length;
            let timerHash = event.target.parentNode.parentNode.getAttribute('taskkey');
            if (timersQuantity == 1) {
                if (event.target.parentNode.classList.contains('active-task-timer')) {
                    ElementsListener.listenToEvents('click', document.getElementsByClassName('active-task-timer'), Timer.showTimer(timerHash));
                }
            }
            else if (timersQuantity == 0) {
                if (!(event.target.parentNode.classList.contains('active-task-timer'))) {
                    ElementsListener.listenToEvents('click', priorityIndicators, Timer.showTimer(timerHash));
                }
            }
        });
    }
}

let timer = new Timer();