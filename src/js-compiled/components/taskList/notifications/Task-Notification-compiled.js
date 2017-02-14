'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskNotification = function () {
    function TaskNotification() {
        _classCallCheck(this, TaskNotification);
    }

    _createClass(TaskNotification, [{
        key: 'wrapNotificationFunctionality',
        value: function wrapNotificationFunctionality(stateNotification) {
            if (document.getElementsByClassName('bottom-message').length > 0) {
                return false;
            }
            var obj = this;
            setTimeout(function () {
                obj.addNotification(stateNotification);
            }, 200);

            setTimeout(function () {
                obj.removeNotification(stateNotification);
            }, 2000);
        }
    }, {
        key: 'addNotification',
        value: function addNotification(stateNotification) {
            try {
                var taskNotification = new Binder('app/components/taskList/notifications/bottom-notifications.html');
                var receiveNotification = taskNotification.downloadComponent();
                wrapper.appendChild(receiveNotification.querySelector(stateNotification));
                setTimeout(function () {
                    document.querySelector(stateNotification).classList.remove('removable-notification');
                    document.querySelector(stateNotification).classList.add('added-notification');
                }, 100);
            } catch (e) {
                throw new Error("notification was already added");
            }
        }
    }, {
        key: 'removeNotification',
        value: function removeNotification(stateNotification) {
            setTimeout(function () {
                try {
                    document.querySelector(stateNotification).classList.remove('added-notification');
                    document.querySelector(stateNotification).classList.add('removable-notification');
                } catch (e) {
                    return false;
                }
            }, 500);
            setTimeout(function () {
                try {
                    document.querySelector(stateNotification).remove();
                } catch (e) {
                    return false;
                }
            }, 1500);
        }
    }], [{
        key: 'createNotification',
        value: function createNotification(params) {
            var newNotification = new TaskNotification();
            newNotification.wrapNotificationFunctionality(params);
        }
    }]);

    return TaskNotification;
}();
//# sourceMappingURL=Task-Notification-compiled.js.map
