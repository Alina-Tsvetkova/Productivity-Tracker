'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkPhaseModel = function () {
    function WorkPhaseModel() {
        _classCallCheck(this, WorkPhaseModel);
    }

    _createClass(WorkPhaseModel, [{
        key: 'receiveDurationOfTimer',
        value: function receiveDurationOfTimer(elem1, elem2, elem3) {
            var workTimeDuration = void 0;
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/cycle').on('value', function (data) {
                workTimeDuration = data.val().workTime;
                workPhaseController.addWorkAnimationDuration(elem1, elem2, elem3, workTimeDuration);
            });
            return workTimeDuration;
        }
    }]);

    return WorkPhaseModel;
}();

var workPhaseModel = new WorkPhaseModel();
//# sourceMappingURL=WorkPhaseModel-compiled.js.map
