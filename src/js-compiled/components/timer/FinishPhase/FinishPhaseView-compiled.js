'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FinishPhaseView = function () {
    function FinishPhaseView() {
        _classCallCheck(this, FinishPhaseView);
    }

    _createClass(FinishPhaseView, [{
        key: 'downloadCompletedTimer',
        value: function downloadCompletedTimer(timerKey) {
            var timerElements = Timer.initializeTimerElements;
            var receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/completed-timer.html');
            timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('timer-completed-wrapper')[0]);
            finishPhaseView.removeEstimation();
            finishPhaseController.transitFinishPhaseData(timerKey);
            var borderColorIndex = timer.receiveColorIndex(timerKey);
            timer.addBorderColor(timerElements.introCompleted[0], borderColorIndex);
            timer.addBorderColor(timerElements.introCompletedWrap[0], borderColorIndex);
        }
    }, {
        key: 'removeEstimation',
        value: function removeEstimation() {
            try {
                document.getElementsByClassName('pomodoros')[0].classList.add('non-visible-elem');
            } catch (e) {
                return 'element is deleted';
            }
        }
    }]);

    return FinishPhaseView;
}();

var finishPhaseView = new FinishPhaseView();
//# sourceMappingURL=FinishPhaseView-compiled.js.map
