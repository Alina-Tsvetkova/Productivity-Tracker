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
            var target = event.target.parentNode;
            if (target.classList.contains('increment') || target.classList.contains('dicrement')) {
                myCycle.changeCycleData(target);
            }

            if (event.target.classList.contains('edit')) {
                var allRenderedEditButtons = document.querySelectorAll('.edit');
                var allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
                allRenderedEditButtons = document.querySelectorAll('.edit');
                allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
                index = allRenderedEditButtonsArr.indexOf(event.target);
                var key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
                modalWindowObj.showEditModal(index, key);
            }
            if (event.target.parentNode.classList.contains('check-button-edit')) {
                productivityManager.saveEditedTask(index);
            }

            if (event.target.parentNode.classList.contains('remove-btn-icon') || event.target.classList.contains('quantity-del-tasks')) {
                if (document.querySelector('.quantity-del-tasks').innerHTML > 0) {
                    (function () {
                        var deleteTaskModal = $('#modal-w-remove');
                        ElementsListener.listenToEvents('click', document.getElementsByClassName('remove-btn'), taskDeletorObj.submitDeleteTask);
                        ElementsListener.listenToEvents('click', document.getElementsByClassName('cancel-btn'), taskDeletorObj.cancelDeletion);
                        $('.remove-btn-icon').click(function () {
                            if (document.querySelector('.quantity-del-tasks').innerHTML > 0) {
                                deleteTaskModal.dialogSwitcher('show');
                            }
                        });
                    })();
                }
                taskDeletorObj.givePossibilityToDelete();
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
