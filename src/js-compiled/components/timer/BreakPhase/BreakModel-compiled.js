'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BreakModel = function () {
    function BreakModel() {
        _classCallCheck(this, BreakModel);
    }

    _createClass(BreakModel, [{
        key: 'receiveTimeOfBreak',
        value: function receiveTimeOfBreak(elem1, elem2, elem3) {
            var breakTimeDuration = void 0;
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/cycle').on('value', function (data) {
                breakTimeDuration = data.val().shortBreak;
                breakController.addBreakAnimationDuration(elem1, elem2, elem3, breakTimeDuration);
                return breakTimeDuration;
            });
            return breakTimeDuration;
        }
    }]);

    return BreakModel;
}();

var breakModel = new BreakModel();
//# sourceMappingURL=BreakModel-compiled.js.map
