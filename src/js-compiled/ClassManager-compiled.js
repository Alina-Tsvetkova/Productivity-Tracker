'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassManager = function () {
    function ClassManager() {
        _classCallCheck(this, ClassManager);
    }

    _createClass(ClassManager, [{
        key: 'removeClass',
        value: function removeClass(obj, cls) {
            try {
                var classes = obj.className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    if (classes[i] == cls) {
                        classes.splice(i, 1);
                        i--;
                    }
                }
                obj.className = classes.join(' ');
            } catch (e) {
                return;
            }
        }
    }]);

    return ClassManager;
}();

var classManager = new ClassManager();
//# sourceMappingURL=ClassManager-compiled.js.map
