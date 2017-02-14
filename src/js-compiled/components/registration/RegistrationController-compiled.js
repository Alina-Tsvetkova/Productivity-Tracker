'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegistrationController = function () {
    function RegistrationController() {
        _classCallCheck(this, RegistrationController);
    }

    _createClass(RegistrationController, [{
        key: 'checkUserInfo',
        value: function checkUserInfo(event) {
            event.preventDefault();
            var signUpValidator = registrationController.getSignUpValidator;
            if (signUpValidator.loginField.value != '' && signUpValidator.passwordField.value != '') {
                registrationModel.createUserInDB();
            } else {
                registrationView.warnToFillBothFields();
            }
        }
    }, {
        key: 'cancelRegistration',
        value: function cancelRegistration(event) {
            event.preventDefault();
            classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
        }
    }, {
        key: 'submitCompleteSignUp',
        value: function submitCompleteSignUp() {
            classManager.removeClass(document.getElementsByClassName('sign-up-complete-wrapper')[0], 'sign-up-complete-appearance');
            location.reload();
        }
    }, {
        key: 'proceedRegistrationErrors',
        value: function proceedRegistrationErrors(errorCode) {
            var signUpValidator = registrationController.getSignUpValidator;
            for (var k = 0; k < signUpValidator.failBlocks.length; k++) {
                classManager.removeClass(signUpValidator.failBlocks[k], 'no-validate');
            }
            classManager.removeClass(signUpValidator.passwordField, 'invalid-field');
            classManager.removeClass(signUpValidator.loginField, 'invalid-field');

            if (errorCode == 'auth/email-already-in-use') {
                registrationView.addBorderToInvalidInput('registration-fail', 0, signUpValidator.failBlocks, "The email address is already in use by another account");
                registrationView.addInvalidField(signUpValidator.loginField);
            }
            if (errorCode == 'auth/weak-password') {
                registrationView.addBorderToInvalidInput('registration-fail', 1, signUpValidator.failBlocks, "Password should be at least 6 characters");
                registrationView.addInvalidField(signUpValidator.passwordField);
            }
        }
    }, {
        key: 'successUserCreation',
        value: function successUserCreation() {
            classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
            registrationView.downloadCompleteSignUp();
        }
    }, {
        key: 'getSignUpValidator',
        get: function get() {
            return {
                loginField: document.getElementsByClassName('email')[0],
                passwordField: document.getElementsByClassName('password')[0],
                inputGroups: document.getElementsByClassName('registration-field'),
                failBlocks: document.getElementsByClassName('registration-fail')
            };
        }
    }]);

    return RegistrationController;
}();

var registrationController = new RegistrationController();
//# sourceMappingURL=RegistrationController-compiled.js.map
