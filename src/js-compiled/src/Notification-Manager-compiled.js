"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationManager = function () {
    function NotificationManager() {
        _classCallCheck(this, NotificationManager);
    }

    _createClass(NotificationManager, null, [{
        key: "showNotification",
        value: function showNotification(message, img, website) {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
                spawnNotification(message, img, website);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if (permission === "granted") {
                        var notification = new Notification(message);
                    }
                });
            }

            Notification.requestPermission();
            function spawnNotification(theBody, theIcon, theTitle) {
                var options = {
                    title: theTitle,
                    body: theBody,
                    icon: theIcon
                };
                var n = new Notification(theTitle, options);
            }
        }
    }]);

    return NotificationManager;
}();

window.addEventListener('offline', function () {
    NotificationManager.showNotification("There is no Internet Connection!", 'assets/img/tomato-failed.png', 'Productivity Tracker');
});

window.addEventListener('online', function () {
    NotificationManager.showNotification("Internet Connection has appeared!!", 'assets/img/tomato-fill.png', 'Productivity Tracker');
});
//# sourceMappingURL=Notification-Manager-compiled.js.map
