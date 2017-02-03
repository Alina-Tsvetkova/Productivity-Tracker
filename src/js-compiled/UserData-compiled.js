'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserData = function () {
    function UserData(userId, email) {
        _classCallCheck(this, UserData);

        this.userId = userId;
        this.email = email;
    }

    _createClass(UserData, [{
        key: 'writeUserData',
        value: function writeUserData() {
            firebase.database().ref('users/' + this.userId).set({
                username: this.email,
                tasks: [{
                    title: 'Add slider',
                    description: 'Add slider to my web-site',
                    category: 'JavaScript',
                    deadline: '20.12.2016',
                    estimation: '4',
                    priority: 'Middle',
                    color_indicator: '1',
                    taskisdone: 'true',
                    dailyTask: false
                }],
                categories: ['Work', 'Education', 'Hobby', 'Sport', 'Other'],
                cycle: {
                    "workTime": 25,
                    "workIteration": 5,
                    "shortBreak": 5,
                    "longBreak": 45
                }
            });
        }
    }, {
        key: 'saveUserDataLocally',
        value: function saveUserDataLocally() {
            localStorage.setItem('currentUser', this.userId);
        }
    }], [{
        key: 'getUserDataLocally',
        value: function getUserDataLocally() {
            return localStorage.getItem('currentUser');
        }
    }]);

    return UserData;
}();
//# sourceMappingURL=UserData-compiled.js.map
