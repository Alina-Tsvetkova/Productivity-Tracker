'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkPhaseView = function () {
    function WorkPhaseView() {
        _classCallCheck(this, WorkPhaseView);
    }

    _createClass(WorkPhaseView, [{
        key: 'downloadWorkPhaseComponent',
        value: function downloadWorkPhaseComponent(timerElements) {
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.activeTimer);
            var receivedElem = timer.downloadTimerComponents('app/components/timer/timer-states/active-timer.html');
            Timer.clearTimerElements(timerElements.timerContainer, timerElements.breakTimer, timerElements.timerOver);
            timerElements.timerContainer.appendChild(receivedElem.getElementsByClassName('active-timer')[0]);
        }
    }, {
        key: 'removeButtons',
        value: function removeButtons(timerElements) {
            timerElements.failPomodoraButton[0].classList.add('non-visible-elem');
            timerElements.finishTaskButton[0].classList.add('non-visible-elem');
        }
    }, {
        key: 'addBorder',
        value: function addBorder(timerElements, borderColorIndex) {
            timer.addBorderColor(timerElements.timerBlock[0], borderColorIndex);
        }
    }]);

    return WorkPhaseView;
}();

var workPhaseView = new WorkPhaseView();
//# sourceMappingURL=WorkPhaseView-compiled.js.map
