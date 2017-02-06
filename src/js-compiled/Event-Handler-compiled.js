'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var index = void 0;

var EventHandler = function () {
    function EventHandler() {
        _classCallCheck(this, EventHandler);
    }

    _createClass(EventHandler, [{
        key: 'addAdditionalEvents',
        value: function addAdditionalEvents(event) {

            if (event.target.classList.contains('edit')) {
                var allRenderedEditButtons = document.querySelectorAll('.edit');
                var allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
                allRenderedEditButtons = document.querySelectorAll('.edit');
                allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
                index = allRenderedEditButtonsArr.indexOf(event.target);
                var key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
                modalWindowObj.showEditModal(index, key);
            }

            if (event.target.classList.contains('move-task')) {
                var _allRenderedEditButtons = document.querySelectorAll('.move-task');
                var _allRenderedEditButtonsArr = Array.prototype.slice.call(_allRenderedEditButtons);
                _allRenderedEditButtons = document.querySelectorAll('.move-task');
                _allRenderedEditButtonsArr = Array.prototype.slice.call(_allRenderedEditButtons);
                index = _allRenderedEditButtonsArr.indexOf(event.target);
                var _key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
                dailyTask.moveTaskToDaily(index, _key);
            }
        }
    }]);

    return EventHandler;
}();

var commonEventHandler = new EventHandler();

document.onclick = function (event) {
    commonEventHandler.addAdditionalEvents(event);
};
//# sourceMappingURL=Event-Handler-compiled.js.map
