'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegistrationView = function () {
    function RegistrationView() {
        _classCallCheck(this, RegistrationView);
    }

    _createClass(RegistrationView, [{
        key: 'downloadCompleteSignUp',
        value: function downloadCompleteSignUp() {
            var completeSignUpBinder = new Binder('app/components/registration/registration-complete.html');
            var regComplete = completeSignUpBinder.downloadComponent();
            document.getElementById('wrapper').appendChild(regComplete.getElementsByClassName('sign-up-complete-wrapper')[0]);
            setTimeout(function () {
                document.getElementsByClassName('sign-up-complete-wrapper')[0].classList.add('sign-up-complete-appearance');
            }, 500);
            ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-up-complete-btn')[0], registrationController.submitCompleteSignUp);
        }
    }, {
        key: 'addBorderToInvalidInput',
        value: function addBorderToInvalidInput(element, index, elem2, str) {
            try {
                document.getElementsByClassName(element)[index].classList.add('no-validate');
                elem2[index].innerHTML = str;
            } catch (e) {
                return 'no element on the page';
            }
        }
    }, {
        key: 'addInvalidField',
        value: function addInvalidField(element) {
            for (var k = 0; k < arguments.length; k++) {
                arguments[k].classList.add('invalid-field');
            }
        }
    }, {
        key: 'warnToFillBothFields',
        value: function warnToFillBothFields() {
            var signUpValidator = registrationController.getSignUpValidator;
            for (var k = 0; k < signUpValidator.failBlocks.length; k++) {
                registrationView.addInvalidField(signUpValidator.loginField, signUpValidator.passwordField);
                signUpValidator.failBlocks[k].classList.add('no-validate');
                signUpValidator.failBlocks[k].innerHTML = 'Fill in both values';
            }
        }
    }]);

    return RegistrationView;
}();

var registrationView = new RegistrationView();
//# sourceMappingURL=RegistrationView-compiled.js.map
