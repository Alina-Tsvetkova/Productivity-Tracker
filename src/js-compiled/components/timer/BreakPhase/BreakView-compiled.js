'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BreakPhaseView = function () {
    function BreakPhaseView() {
        _classCallCheck(this, BreakPhaseView);
    }

    _createClass(BreakPhaseView, [{
        key: 'startBreak',
        value: function startBreak() {
            breakPhaseView.downloadBreakComponent();
            breakController.subscribeBreakEvents();
            timer.addAnimationToTimerComponents();
            var timerElements = Timer.initializeTimerElements;

            var borderColorIndex = timer.receiveColorIndex(timerKey);
            timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);

            breakController.transferTimeOfBreak(timerElements.timerRotator, timerElements.timerInvader, timerElements.timerDivider);
        }
    }, {
        key: 'downloadBreakComponent',
        value: function downloadBreakComponent() {
            var receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-timer.html');
            var timerElements = Timer.initializeTimerElements;
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
            timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('break-timer')[0]);
        }
    }, {
        key: 'downloadBreakOverComponent',
        value: function downloadBreakOverComponent() {
            var timerElements = Timer.initializeTimerElements;
            var receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/break-over-timer.html');
            Timer.clearTimerElements(timerElements.breakTimer, document.getElementsByClassName('timer-break-running')[0]);
            timerElements.breakTimer.insertBefore(receivedElem.getElementsByClassName('timer-break')[0], timerElements.breakButtons);
        }
    }, {
        key: 'notifyBreakOver',
        value: function notifyBreakOver() {
            var timerElements = Timer.initializeTimerElements;
            breakPhaseView.downloadBreakOverComponent();
            var borderColorIndex = timer.receiveColorIndex(timerKey);
            timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
            timer.addBorderColor(timerElements.breakWrap[0], borderColorIndex);
        }
    }]);

    return BreakPhaseView;
}();

var breakPhaseView = new BreakPhaseView();
//# sourceMappingURL=BreakView-compiled.js.map
