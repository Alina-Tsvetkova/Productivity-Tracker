'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogOutModel = function () {
    function LogOutModel() {
        _classCallCheck(this, LogOutModel);
    }

    _createClass(LogOutModel, [{
        key: 'logOutUser',
        value: function logOutUser() {
            firebase.auth().signOut().then(function () {
                localStorage.removeItem('currentUser');
                appStarter.downloadLoginPage();
                location.reload();
            }, function (error) {
                logOutController.proceedErrors(error);
            });
        }
    }]);

    return LogOutModel;
}();

var logOutModel = new LogOutModel();
//# sourceMappingURL=LogOutModel-compiled.js.map
