'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppStarter = function () {
    function AppStarter() {
        _classCallCheck(this, AppStarter);
    }

    _createClass(AppStarter, [{
        key: 'downloadLoginPage',
        value: function downloadLoginPage() {
            var loginBinder = new Binder('app/components/login/login.html', document.body);
            loginBinder.downloadComponent();
            Router.addHash("");
            var userId = localStorage.getItem('currentUser');
            ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-in'), checkLoginPassObj.checkLoginPass);
            ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-up'), checkLoginPassObj.downloadSignUp);
            if (userId != null) {
                var settingsBinder = new Binder('app/components/settings/settings.html', document.body);
                settingsBinder.downloadComponent();
                Settings.downloadSettings();
            }
        }
    }]);

    return AppStarter;
}();

var appStarter = new AppStarter();

appStarter.downloadLoginPage();
//# sourceMappingURL=script-compiled.js.map
