"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);
    }

    _createClass(Router, null, [{
        key: "listenToHashChanges",
        value: function listenToHashChanges() {
            $(window).on('popstate', function (e) {
                if (window.location.hash == "#reports") {
                    Reports.downloadReports();
                } else if (window.location.hash == "#settings-cycle") {
                    var settingsBinder = new Binder('app/components/settings/settings.html', document.body);
                    settingsBinder.downloadComponent();
                    Settings.downloadSettings();
                }
            });
        }
    }, {
        key: "addHash",
        value: function addHash(hash) {
            window.location.hash = hash;
        }
    }, {
        key: "iconLinksBinder",
        value: function iconLinksBinder() {
            ElementsListener.listenToEvents('click', document.getElementsByClassName('settings-switcher'), function () {
                var settingsBinder = new Binder('app/components/settings/settings.html', document.body);
                settingsBinder.downloadComponent();
                Settings.downloadSettings();
                Router.listenToHashChanges();
            });
            ElementsListener.listenToEvents('click', document.getElementsByClassName('tasks-list-icon'), function () {
                counterOfTasks = 0;
                TaskList.moveToTaskList();
                Router.listenToHashChanges();
            });
            ElementsListener.listenToEvents('click', document.getElementsByClassName('log-out'), function () {
                loggedUser.logOutWrapper();
            });
            ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), function () {
                Reports.downloadReports();
                Router.listenToHashChanges();
            });
        }
    }]);

    return Router;
}();

Router.listenToHashChanges();
//# sourceMappingURL=Router-compiled.js.map
