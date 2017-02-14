'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserValidationView = function () {
    function UserValidationView() {
        _classCallCheck(this, UserValidationView);
    }

    _createClass(UserValidationView, [{
        key: 'downloadSignUp',
        value: function downloadSignUp(event) {
            event.preventDefault();
            var registrationFormBinder = new Binder('app/components/registration/registration-form.html');
            var regFom = registrationFormBinder.downloadComponent();
            document.getElementById('wrapper').appendChild(regFom.getElementsByClassName('form-registration')[0]);
            userValidationController.subscribeValidationEvents();
            setTimeout(function () {
                document.getElementsByClassName('form-registration')[0].classList.add('form-registration-appearance');
            }, 500);
        }
    }]);

    return UserValidationView;
}();

var userValidationView = new UserValidationView();
//# sourceMappingURL=UserValidationView-compiled.js.map
