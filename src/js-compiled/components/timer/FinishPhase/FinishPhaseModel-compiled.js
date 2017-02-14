'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FinishPhaseModel = function () {
    function FinishPhaseModel() {
        _classCallCheck(this, FinishPhaseModel);
    }

    _createClass(FinishPhaseModel, [{
        key: 'sendDataTaskFailed',
        value: function sendDataTaskFailed(timerKey) {
            var today = finishPhaseController.receiveDateOfTaskFinish();
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + timerKey).update({
                taskIsDone: 'failed',
                priority: 'Failed',
                dateOfFinish: today
            });
        }
    }, {
        key: 'sendDataTaskDone',
        value: function sendDataTaskDone(timerKey) {
            var today = finishPhaseController.receiveDateOfTaskFinish();
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + timerKey).update({
                taskIsDone: true,
                dateOfFinish: today
            });
        }
    }]);

    return FinishPhaseModel;
}();

var finishPhaseModel = new FinishPhaseModel();
//# sourceMappingURL=FinishPhaseModel-compiled.js.map
