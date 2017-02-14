'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CycleModel = function () {
    function CycleModel() {
        _classCallCheck(this, CycleModel);
    }

    _createClass(CycleModel, [{
        key: 'saveUserCycle',
        value: function saveUserCycle(userId, event) {
            cycleController.getDataForCycle();
            firebase.database().ref('users/' + userId).update({
                cycle: {
                    "workTime": cycleController.workTime,
                    "workIteration": cycleController.workIteration,
                    "shortBreak": cycleController.shortBreak,
                    "longBreak": cycleController.longBreak
                }
            });

            Settings.notifyAboutSuccessfulSave(event);
        }
    }], [{
        key: 'createCycle',
        value: function createCycle(event) {
            var savedCycle = new CycleModel();
            savedCycle.saveUserCycle(localStorage.getItem('currentUser'), event);
        }
    }, {
        key: 'receiveCycleData',
        value: function receiveCycleData() {
            var userId = localStorage.getItem('currentUser');
            var cycleReceiver = firebase.database().ref('users/' + userId + '/cycle');
            cycleReceiver.on('value', function (data) {
                cycleController.receiveCycleDataForRender(data.val());
            });
        }
    }]);

    return CycleModel;
}();
//# sourceMappingURL=CycleModel-compiled.js.map
