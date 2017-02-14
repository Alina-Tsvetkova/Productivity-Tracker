'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialTimerModel = function () {
    function InitialTimerModel() {
        _classCallCheck(this, InitialTimerModel);
    }

    _createClass(InitialTimerModel, [{
        key: 'addTaskInformation',
        value: function addTaskInformation(taskKey) {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + taskKey).on('value', function (data) {
                var taskTitle = data.val().title;
                var taskDescription = data.val().description;
                var taskEstimation = data.val().estimation;
                initialTimerController.transferInfoForRender(taskKey, taskTitle, taskDescription, taskEstimation);
            });
        }
    }]);

    return InitialTimerModel;
}();

var initialTimerModel = new InitialTimerModel();
//# sourceMappingURL=InitialTimerModel-compiled.js.map
