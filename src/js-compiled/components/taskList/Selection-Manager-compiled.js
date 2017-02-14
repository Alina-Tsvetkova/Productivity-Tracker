'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectionManager = function () {
    function SelectionManager() {
        _classCallCheck(this, SelectionManager);
    }

    _createClass(SelectionManager, null, [{
        key: 'selectAll',
        value: function selectAll(elements) {
            var taskListElements = TaskList.getTaskListElements;
            var taskHashes = document.querySelectorAll(elements);
            SelectionManager.pushHashesToDeleteSet(taskHashes);
            var selectedSize = selectedTaskHashes.size;
            for (var l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
                taskListElements.quantityOfSelectedTasks[l].style.display = 'block';
                taskListElements.quantityOfSelectedTasks[l].innerHTML = selectedSize;
            }
            taskDeletorObj.pushTaskToDelete();
            TaskNotification.createNotification('.message-warn');
        }
    }, {
        key: 'pushHashesToDeleteSet',
        value: function pushHashesToDeleteSet(taskHashes) {
            for (var k = 0; k < taskHashes.length; k++) {
                selectedTaskHashes.add(taskHashes[k].getAttribute('taskkey'));
                SelectionManager.changeSelectedTaskImage(taskHashes[k].getElementsByClassName('indicator')[0]);
            }
        }
    }, {
        key: 'changeSelectedTaskImage',
        value: function changeSelectedTaskImage(task) {
            classManager.removeClass(task, 'canceled-delete');
            task.classList.add('for-delete-bg');
        }
    }, {
        key: 'changeDeselectedTaskImage',
        value: function changeDeselectedTaskImage(task) {
            classManager.removeClass(task, 'for-delete-bg');
            classManager.removeClass(task, 'for-delete');
            task.classList.add('canceled-delete');
        }
    }, {
        key: 'deselectAllSelectedTasks',
        value: function deselectAllSelectedTasks(elements) {
            var taskListElements = TaskList.getTaskListElements;
            var taskHashes = document.querySelectorAll(elements);
            SelectionManager.removeHashesToDeselect(taskHashes);
            var selectedSize = selectedTaskHashes.size;
            for (var l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
                if (taskListElements.quantityOfSelectedTasks[l].innerHTML == 0) {
                    return;
                }
                taskListElements.quantityOfSelectedTasks[l].innerHTML = selectedSize;
            }
        }
    }, {
        key: 'removeHashesToDeselect',
        value: function removeHashesToDeselect(taskHashes) {
            for (var k = 0; k < taskHashes.length; k++) {
                selectedTaskHashes.delete(taskHashes[k].getAttribute('taskkey'));
                SelectionManager.changeDeselectedTaskImage(taskHashes[k].getElementsByClassName('indicator')[0]);
            }
        }
    }]);

    return SelectionManager;
}();
//# sourceMappingURL=Selection-Manager-compiled.js.map
