'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Icons = function () {
    function Icons() {
        _classCallCheck(this, Icons);
    }

    _createClass(Icons, null, [{
        key: 'iconLinksBinder',
        value: function iconLinksBinder() {

            var isieEdge = navigator.appName == "Netscape" && navigator.appVersion.indexOf('Trident') === -1; // IE Edge

            var icons = Icons.iconsObj;
            ElementsListener.listenToEvents('click', icons.settingsIcon, function () {
                Router.addHash("settings-cycle");
                if (isieEdge) {
                    Settings.downloadSettings();
                }
            });
            ElementsListener.listenToEvents('click', icons.taskListIcon, function () {
                Router.addHash("task-list");
                if (isieEdge) {
                    TaskList.moveToTaskList();
                }
            });
            ElementsListener.listenToEvents('click', icons.logOutIcon, function () {
                logOutView.downloadLogOut();
            });
            ElementsListener.listenToEvents('click', icons.reportsIcon, function () {
                Router.addHash("reports");
                if (isieEdge) {
                    Reports.downloadReports();
                }
            });
            ElementsListener.listenToEvents('click', icons.prevBtn, function () {
                Router.addHash("task-list");
                if (isieEdge) {
                    TaskList.moveToTaskList();
                }
            });
            ElementsListener.listenToEvents('click', icons.nextBtn, function () {
                Router.addHash("reports");
                if (isieEdge) {
                    Reports.downloadReports();
                }
            });
        }
    }, {
        key: 'downloadMainIcons',
        value: function downloadMainIcons() {
            var iconsBinder = new Binder('app/components/icons/icons.html');
            var iconsDoc = iconsBinder.downloadComponent();
            document.getElementsByClassName('icons')[0].appendChild(iconsDoc.getElementsByClassName('main-icons')[0]);
        }
    }, {
        key: 'iconsObj',
        get: function get() {
            return {
                settingsIcon: document.getElementsByClassName('settings-switcher'),
                taskListIcon: document.getElementsByClassName('tasks-list-icon'),
                logOutIcon: document.getElementsByClassName('log-out'),
                reportsIcon: document.getElementsByClassName('reports-switcher'),
                prevBtn: document.getElementsByClassName('prev-btn'),
                nextBtn: document.getElementsByClassName('next-arrow')
            };
        }
    }]);

    return Icons;
}();
//# sourceMappingURL=Icons-compiled.js.map
