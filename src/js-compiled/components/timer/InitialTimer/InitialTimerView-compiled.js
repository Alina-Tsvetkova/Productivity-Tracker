'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialTimerView = function () {
    function InitialTimerView() {
        _classCallCheck(this, InitialTimerView);
    }

    _createClass(InitialTimerView, [{
        key: 'showTimer',
        value: function showTimer(taskKey) {
            Router.addHash("timer");
            timerKey = taskKey;
            var timerBinder = new Binder('app/components/timer/timer.html', document.body);
            timerBinder.downloadComponent();
            initialTimerView.downloadIntroTimer();
            ElementsListener.listenToEvents('click', document.getElementsByClassName('start-timer'), initialTimerView.downloadStartTimer);

            initialTimerController.transitTaskInformation(timerKey);

            Icons.downloadMainIcons();
            Icons.iconLinksBinder();
            var tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
        }
    }, {
        key: 'downloadIntroTimer',
        value: function downloadIntroTimer() {
            var timerIntroBinder = new Binder('app/components/timer/timer-states/intro-timer.html');
            var receivedDocIntroTimer = timerIntroBinder.downloadComponent();
            document.getElementsByClassName('timer-content')[0].appendChild(receivedDocIntroTimer.getElementById('intro-timer'));
        }
    }, {
        key: 'downloadStartTimer',
        value: function downloadStartTimer() {
            var receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
            var timerElements = Timer.initializeTimerElements;
            timerElements.timerContainer.removeChild(document.getElementById('intro-timer'));
            timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
            timer.addAnimationToTimerComponents();
            initialTimerController.subscribeStartTimerEvents(timerElements);
            workPhaseModel.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
            var borderColorIndex = timer.receiveColorIndex(timerKey);
            timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);
        }
    }, {
        key: 'renderTaskInformation',
        value: function renderTaskInformation(taskKey, taskTitle, taskDescription, taskEstimation) {
            document.getElementsByClassName('task-title-timer')[0].innerHTML = taskTitle;
            document.getElementsByClassName('task-description-timer')[0].innerHTML = taskDescription;
            var estimationList = document.getElementsByClassName('pomodoros')[0];
            timerAttempts = taskEstimation;
            for (var j = 0; j < timerAttempts; j++) {
                var estimationListElem = document.createElement('li');
                estimationListElem.classList.add('pomodoro');
                estimationList.appendChild(estimationListElem);
            }

            var borderColorIndex = timer.receiveColorIndex(taskKey);
            timer.addBorderColor(document.getElementsByClassName('intro-slog')[0], borderColorIndex);
        }
    }]);

    return InitialTimerView;
}();

var initialTimerView = new InitialTimerView();
//# sourceMappingURL=InitialTimerView-compiled.js.map
