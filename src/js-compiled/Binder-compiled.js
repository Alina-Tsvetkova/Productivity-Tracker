"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Binder = function () {
    function Binder(route, parent) {
        _classCallCheck(this, Binder);

        this.route = route;
        this.parent = parent;
    }

    _createClass(Binder, [{
        key: "downloadComponent",
        value: function downloadComponent(route, parent) {
            var componentRequest = new XMLHttpRequest();
            var componentParser = new DOMParser();
            componentRequest.open('GET', this.route, false);
            componentRequest.send();
            var doc = componentParser.parseFromString(componentRequest.responseText, "text/html");
            if (this.parent) {
                this.parent.innerHTML = doc.body.innerHTML;
            }
            componentRequest = null;
            return doc;
        }
    }], [{
        key: "downloadPlugins",
        value: function downloadPlugins() {
            $(document).ready(function () {
                var tabs = $("#tabs");
                tabs.tabSwitcher();
                var tooltips = $('.tooltip');
                tooltips.tooltipSwitcher();
            });
        }
    }]);

    return Binder;
}();
//# sourceMappingURL=Binder-compiled.js.map
