'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkPhaseController = function () {
    function WorkPhaseController() {
        _classCallCheck(this, WorkPhaseController);
    }

    _createClass(WorkPhaseController, [{
        key: 'startPomodora',
        value: function startPomodora() {
            var timerElements = Timer.initializeTimerElements;
            workPhaseView.downloadWorkPhaseComponent(timerElements);
            workPhaseController.subscribeWorkPhaseEvents(timerElements);
            timer.addAnimationToTimerComponents();
            timer.addRunningAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
            var borderColorIndex = timer.receiveColorIndex(timerKey);
            workPhaseView.addBorder(timerElements, borderColorIndex);
        }
    }, {
        key: 'finishPomodora',
        value: function finishPomodora() {
            // break starts
            var timerElements = Timer.initializeTimerElements;
            timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
            timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('finish-pomodoro');
            breakTimerAttempts++;
            if (breakTimerAttempts === timerAttempts) {
                finishPhaseController.completeTask();
                Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
            } else {
                try {
                    breakPhaseView.startBreak();
                } catch (e) {
                    return "Module is corrupted or switched off";
                }
            }
        }
    }, {
        key: 'failPomodora',
        value: function failPomodora() {
            var timerElements = Timer.initializeTimerElements;
            timer.addPausedAnimation(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
            timerElements.pomodoroAttempts[breakTimerAttempts].classList.add('fail-pomodoro');
            breakTimerAttempts++;

            if (breakTimerAttempts === timerAttempts) {
                finishPhaseController.failTask();
            }
            finishPhaseController.addStartPomodoraBtn();

            try {
                workPhaseView.removeButtons(timerElements);
            } catch (e) {
                return 'element is already removed';
            }
        }
    }, {
        key: 'subscribeWorkPhaseEvents',
        value: function subscribeWorkPhaseEvents(timerElements) {
            ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhaseController.finishPomodora);
            ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhaseController.failPomodora);
        }
    }, {
        key: 'addWorkAnimationDuration',
        value: function addWorkAnimationDuration(elem1, elem2, elem3, workTimeDuration) {
            var timerElements = Timer.initializeTimerElements;
            try {
                for (var j = 0; j < arguments.length - 1; j++) {
                    arguments[j].style.animationDuration = workTimeDuration * 60 + 's';
                }
            } catch (e) {
                return "element is undefined";
            }
            timerElements.timerMinutes.innerHTML = workTimeDuration;
        }
    }]);

    return WorkPhaseController;
}();

var workPhaseController = new WorkPhaseController();
//# sourceMappingURL=WorkPhaseController-compiled.js.map
