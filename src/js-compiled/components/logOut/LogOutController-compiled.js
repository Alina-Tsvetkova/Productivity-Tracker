'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogOutController = function () {
    function LogOutController() {
        _classCallCheck(this, LogOutController);
    }

    _createClass(LogOutController, [{
        key: 'cancelLogOut',
        value: function cancelLogOut(event) {
            event.preventDefault();
            var logOutElems = logOutController.logOutElements;
            classManager.removeClass(logOutElems.logOutFormWrap, 'log-out-form-wrapper-appearance');
            setTimeout(function () {
                document.getElementById('wrapper').removeChild(logOutElems.logOutFormWrap);
            }, 1000);
        }
    }, {
        key: 'subscribeLogOutEvents',
        value: function subscribeLogOutEvents() {
            var logOutElems = logOutController.logOutElements;
            ElementsListener.listenToEvents('click', logOutElems.closeLogOutFrom, function (event) {
                logOutController.cancelLogOut(event);
            });
            ElementsListener.listenToEvents('click', logOutElems.logOutBtn, function () {
                logOutModel.logOutUser();
            }, 500);
        }
    }, {
        key: 'proceedErrors',
        value: function proceedErrors(error) {
            return 'An error has occured';
        }
    }, {
        key: 'logOutElements',
        get: function get() {
            return {
                logOutFormWrap: document.getElementsByClassName('log-out-form-wrapper')[0],
                logOutBtn: document.getElementsByClassName('log-out-btn'),
                closeLogOutFrom: document.getElementsByClassName('close-log-out-form')
            };
        }
    }]);

    return LogOutController;
}();

var logOutController = new LogOutController();
//# sourceMappingURL=LogOutController-compiled.js.map
