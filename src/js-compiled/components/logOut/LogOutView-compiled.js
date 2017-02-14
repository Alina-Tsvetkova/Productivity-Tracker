'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogOutView = function () {
    function LogOutView() {
        _classCallCheck(this, LogOutView);
    }

    _createClass(LogOutView, [{
        key: 'downloadLogOut',
        value: function downloadLogOut() {
            var logOutBinder = new Binder('app/components/logOut/logOut.html');
            var logOutElem = logOutBinder.downloadComponent();
            document.getElementById('wrapper').appendChild(logOutElem.getElementsByClassName('log-out-form-wrapper')[0]);
            var logOutElems = logOutController.logOutElements;
            setTimeout(function () {
                logOutElems.logOutFormWrap.classList.add('log-out-form-wrapper-appearance');
            }, 500);
            logOutController.subscribeLogOutEvents();
        }
    }]);

    return LogOutView;
}();

var logOutView = new LogOutView();
//# sourceMappingURL=LogOutView-compiled.js.map
