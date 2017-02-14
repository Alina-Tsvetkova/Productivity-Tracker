'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegistrationModel = function () {
    function RegistrationModel() {
        _classCallCheck(this, RegistrationModel);
    }

    _createClass(RegistrationModel, [{
        key: 'createUserInDB',
        value: function createUserInDB() {
            var signUpValidator = registrationController.getSignUpValidator;
            firebase.auth().createUserWithEmailAndPassword(signUpValidator.loginField.value, signUpValidator.passwordField.value).then(function (user) {
                var userNew = new UserData(user.uid, user.email);
                registrationModel.writeDefaultUserData.call(userNew);
                registrationController.successUserCreation();
            }).catch(function (error) {
                var errorCode = error.code;
                registrationController.proceedRegistrationErrors(errorCode);
                return false;
            });
        }
    }, {
        key: 'writeDefaultUserData',
        value: function writeDefaultUserData() {
            var monthAndCounterBinding = {
                'Urgent': new Array(30),
                'Middle': new Array(30),
                'High': new Array(30),
                'Low': new Array(30),
                'Failed': new Array(30)
            };

            for (var key in monthAndCounterBinding) {
                for (var l = 0; l <= 30; l++) {
                    monthAndCounterBinding[key][l] = 0;
                }
            }

            firebase.database().ref('users/' + this.userId).set({
                username: this.email,
                categories: ['Work', 'Education', 'Hobby', 'Sport', 'Other'],
                cycle: {
                    "workTime": 25,
                    "workIteration": 5,
                    "shortBreak": 5,
                    "longBreak": 45
                },
                reports: monthAndCounterBinding,
                pomodoros: monthAndCounterBinding
            });
        }
    }, {
        key: 'saveUserDataLocally',
        value: function saveUserDataLocally(userId) {
            localStorage.setItem('currentUser', userId);
        }
    }], [{
        key: 'getUserDataLocally',
        value: function getUserDataLocally() {
            return localStorage.getItem('currentUser');
        }
    }]);

    return RegistrationModel;
}();

var registrationModel = new RegistrationModel();
//# sourceMappingURL=RegistrationModel-compiled.js.map
