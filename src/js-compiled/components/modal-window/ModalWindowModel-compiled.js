'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalWindowModel = function () {
    function ModalWindowModel() {
        _classCallCheck(this, ModalWindowModel);
    }

    _createClass(ModalWindowModel, [{
        key: 'downloadEarlierCategories',
        value: function downloadEarlierCategories() {
            var userId = localStorage.getItem('currentUser');
            var categoriesReceiver = firebase.database().ref('users/' + userId + '/categories');
            categoriesReceiver.once('value', function (data) {
                var dataValue = [].concat(data.val());
                for (var k = 0; k < dataValue.length; k++) {
                    var val = dataValue[k];
                    modalWindowController.transitCategories(val, k);
                }
            });
        }
    }]);

    return ModalWindowModel;
}();

var modalWindowModel = new ModalWindowModel();
//# sourceMappingURL=ModalWindowModel-compiled.js.map
