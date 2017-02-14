'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var breakTimerAttempts = 0;
var timerKey = void 0;
var timerAttempts = void 0;

var Timer = function () {
    function Timer() {
        _classCallCheck(this, Timer);
    }

    _createClass(Timer, [{
        key: 'receiveColorIndex',
        value: function receiveColorIndex(timerKey) {
            try {
                var borderColorIndex = void 0;
                firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + timerKey).on('value', function (data) {
                    borderColorIndex = data.val().colorIndicator;
                });
                return borderColorIndex;
            } catch (e) {
                return "element is already null";
            }
        }
    }, {
        key: 'addBorderColor',
        value: function addBorderColor(element, value) {
            try {
                var borderColors = ['#ffb200', '#59abe3', '#9849b8', '#e16c65', '#00d4d9'];
                element.style.borderColor = borderColors[value];
            } catch (e) {
                return 'no element to add border';
            }
        }
    }, {
        key: 'downloadTimerComponents',
        value: function downloadTimerComponents(route) {
            var timerElement = new Binder(route);
            return timerElement.downloadComponent();
        }
    }, {
        key: 'addAnimationToTimerComponents',
        value: function addAnimationToTimerComponents() {
            var timerElements = Timer.initializeTimerElements;
            timerElements.timerRotator.style.animation = 'rotateTimer linear 1 forwards';
            timerElements.timerInvader.style.animation = 'animateOpacity steps(1, end) 1 reverse forwards';
            timerElements.timerDivider.style.animation = 'animateOpacity steps(1, end) 1 forwards';
            workPhaseModel.receiveDurationOfTimer(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        }
    }, {
        key: 'addPausedAnimation',
        value: function addPausedAnimation() {
            for (var j = 0; j < arguments.length; j++) {
                arguments[j].classList.remove('running-animation');
                arguments[j].classList.add('paused-animation');
            }
        }
    }, {
        key: 'addRunningAnimation',
        value: function addRunningAnimation() {
            for (var j = 0; j < arguments.length; j++) {
                arguments[j].classList.remove('paused-animation');
                arguments[j].classList.add('running-animation');
            }
        }
    }], [{
        key: 'clearTimerElements',
        value: function clearTimerElements(parent, child) {
            try {
                parent.removeChild(child);
            } catch (e) {
                return 'element is already removed';
            }
        }
    }, {
        key: 'initializeTimerElements',
        get: function get() {
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
            };
        }
    }]);

    return Timer;
}();

var timer = new Timer();
//# sourceMappingURL=Timer-compiled.js.map
