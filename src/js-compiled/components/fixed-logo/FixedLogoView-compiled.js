'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FixedLogoViewComponent = function () {
    function FixedLogoViewComponent() {
        _classCallCheck(this, FixedLogoViewComponent);
    }

    _createClass(FixedLogoViewComponent, [{
        key: 'downloadFixedLogo',
        value: function downloadFixedLogo() {
            var headerBinder = new Binder('app/components/fixed-logo/fixed-logo.html');
            var headerDoc = headerBinder.downloadComponent();
            document.body.appendChild(headerDoc.getElementsByClassName('fixed-logo')[0]);
            TaskList.subscribeCommonTaskListEvents();
        }
    }]);

    return FixedLogoViewComponent;
}();

var fixedLogoView = new FixedLogoViewComponent();
//# sourceMappingURL=FixedLogoView-compiled.js.map
