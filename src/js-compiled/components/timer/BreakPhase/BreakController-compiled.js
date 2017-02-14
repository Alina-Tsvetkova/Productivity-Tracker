'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BreakController = function () {
    function BreakController() {
        _classCallCheck(this, BreakController);
    }

    _createClass(BreakController, [{
        key: 'addBreakAnimationDuration',
        value: function addBreakAnimationDuration(elem1, elem2, elem3, breakTimeDuration) {
            var timerElements = Timer.initializeTimerElements;
            for (var j = 0; j < arguments.length - 1; j++) {
                arguments[j].style.animationDuration = breakTimeDuration * 60 + 's';
            }
            timerElements.timerMinutes.innerHTML = breakTimeDuration;
        }
    }, {
        key: 'subscribeBreakEvents',
        value: function subscribeBreakEvents() {
            var timerElements = Timer.initializeTimerElements;
            ElementsListener.listenToEvents('click', timerElements.finishTaskButton, function () {
                finishPhaseController.finishTask(timerKey);
            });
            ElementsListener.listenToEvents('click', timerElements.startPomodoraButton, workPhaseController.startPomodora);
        }
    }, {
        key: 'transferTimeOfBreak',
        value: function transferTimeOfBreak(elem1, elem2, elem3) {
            var breakDuration = breakModel.receiveTimeOfBreak(elem1, elem2, elem3);
            setTimeout(function () {
                breakPhaseView.notifyBreakOver();
            }, breakDuration * 1000 * 60);
        }
    }]);

    return BreakController;
}();

var breakController = new BreakController();
//# sourceMappingURL=BreakController-compiled.js.map
