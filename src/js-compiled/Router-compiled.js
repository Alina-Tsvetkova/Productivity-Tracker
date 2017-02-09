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
                    Settings.downloadSettings();
                } else if (window.location.hash == "#task-list") {
                    TaskList.moveToTaskList();
                }
            });
        }
    }, {
        key: "addHash",
        value: function addHash(hash) {
            window.location.hash = hash;
        }
    }]);

    return Router;
}();

Router.listenToHashChanges();
//# sourceMappingURL=Router-compiled.js.map
