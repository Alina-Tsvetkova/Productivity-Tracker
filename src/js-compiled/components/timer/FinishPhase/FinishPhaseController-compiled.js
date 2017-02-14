'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FinishPhaseController = function () {
    function FinishPhaseController() {
        _classCallCheck(this, FinishPhaseController);
    }

    _createClass(FinishPhaseController, [{
        key: 'completeTask',
        value: function completeTask() {
            var timerElements = Timer.initializeTimerElements;
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
            finishPhaseView.downloadCompletedTimer(timerKey);
            breakTimerAttempts = 0;
        }
    }, {
        key: 'finishTask',
        value: function finishTask(timerKey) {
            var timerElements = Timer.initializeTimerElements;
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer);
            finishPhaseView.downloadCompletedTimer(timerKey);

            breakTimerAttempts = 0;
        }
    }, {
        key: 'failTask',
        value: function failTask() {
            var timerElements = Timer.initializeTimerElements;
            var receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/failed-timer.html');
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
            timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-failed-wrapper')[0]);
            var borderColorIndex = timer.receiveColorIndex(timerKey);
            timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
            timer.addBorderColor(timerElements.failedWrap[0], borderColorIndex);
            finishPhaseModel.sendDataTaskFailed(timerKey);
            finishPhaseView.removeEstimation();
            breakTimerAttempts = 0;
        }
    }, {
        key: 'addStartPomodoraBtn',
        value: function addStartPomodoraBtn() {
            var timerElements = Timer.initializeTimerElements;
            classManager.removeClass(timerElements.startPomodoraButton[0], 'non-visible-elem');
            ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, workPhaseController.startPomodora);
        }
    }, {
        key: 'receiveDateOfTaskFinish',
        value: function receiveDateOfTaskFinish() {
            return new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
        }
    }, {
        key: 'transitFinishPhaseData',
        value: function transitFinishPhaseData(timerKey) {
            finishPhaseModel.sendDataTaskDone(timerKey);
        }
    }]);

    return FinishPhaseController;
}();

var finishPhaseController = new FinishPhaseController();
//# sourceMappingURL=FinishPhaseController-compiled.js.map
