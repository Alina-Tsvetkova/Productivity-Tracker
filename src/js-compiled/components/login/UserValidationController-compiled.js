'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserValidationController = function () {
    function UserValidationController() {
        _classCallCheck(this, UserValidationController);
    }

    _createClass(UserValidationController, [{
        key: 'successfulSignIn',
        value: function successfulSignIn() {
            Settings.downloadSettings();
        }
    }, {
        key: 'subscribeValidationEvents',
        value: function subscribeValidationEvents() {
            ElementsListener.listenToEvents('click', document.getElementsByClassName('submit-sign-up'), registrationController.checkUserInfo);
            ElementsListener.listenToEvents('click', document.getElementsByClassName('close-registration-form'), registrationController.cancelRegistration);
        }
    }, {
        key: 'checkLoginAndPass',
        value: function checkLoginAndPass(event) {
            event.preventDefault();
            userValidationModel.openSessionForUser();
        }
    }, {
        key: 'proceedSignInErrors',
        value: function proceedSignInErrors(errorCode) {
            var loginObject = userValidationController.getLogInObject;
            for (var k = 0; k < loginObject.logInFields.length; k++) {
                classManager.removeClass(loginObject.logInFields[k], 'no-validate');
            }
            classManager.removeClass(loginObject.passwordField, 'invalid-field');
            classManager.removeClass(loginObject.loginField, 'invalid-field');

            if (errorCode == 'auth/wrong-password') {
                registrationView.addBorderToInvalidInput('fail-validation', 1);
                registrationView.addInvalidField(loginObject.passwordField);
            }
            if (errorCode == 'auth/user-not-found') {
                registrationView.addBorderToInvalidInput('fail-validation', 0);
                registrationView.addInvalidField(loginObject.loginField);
            }
        }
    }, {
        key: 'getLogInObject',
        get: function get() {
            return {
                loginField: document.getElementsByClassName('for-username')[0],
                passwordField: document.getElementsByClassName('for-password')[0],
                inputGroups: document.getElementsByClassName('input-groups'),
                logInFields: document.getElementsByClassName('fail-validation')
            };
        }
    }]);

    return UserValidationController;
}();

var userValidationController = new UserValidationController();
//# sourceMappingURL=UserValidationController-compiled.js.map
