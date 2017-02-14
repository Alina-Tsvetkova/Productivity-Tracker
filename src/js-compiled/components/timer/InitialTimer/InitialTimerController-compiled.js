'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialTimerController = function () {
    function InitialTimerController() {
        _classCallCheck(this, InitialTimerController);
    }

    _createClass(InitialTimerController, [{
        key: 'subscribeStartTimerEvents',
        value: function subscribeStartTimerEvents(timerElements) {
            ElementsListener.listenToEvents('click', timerElements.finishPomodoraButton, workPhaseController.finishPomodora);
            ElementsListener.listenToEvents('click', timerElements.failPomodoraButton, workPhaseController.failPomodora);
        }
    }, {
        key: 'transitTaskInformation',
        value: function transitTaskInformation(taskKey) {
            initialTimerModel.addTaskInformation(taskKey);
        }
    }, {
        key: 'transferInfoForRender',
        value: function transferInfoForRender(taskKey, taskTitle, taskDescription, taskEstimation) {
            initialTimerView.renderTaskInformation(taskKey, taskTitle, taskDescription, taskEstimation);
        }
    }]);

    return InitialTimerController;
}();

var initialTimerController = new InitialTimerController();
//# sourceMappingURL=InitialTimerController-compiled.js.map
