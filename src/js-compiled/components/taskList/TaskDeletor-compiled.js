'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selectedTaskHashes = new Set();

var TaskDeletor = function () {
    function TaskDeletor() {
        _classCallCheck(this, TaskDeletor);
    }

    _createClass(TaskDeletor, [{
        key: 'cancelDeletion',
        value: function cancelDeletion() {
            selectedTaskHashes.clear();
            taskDeletorObj.removeIndicatorOfQuantityDel();
            var deleteElements = taskDeletorObj.deleteTaskObj;
            modalWindowController.closeModalWindow(document.getElementById('modal-w-remove'));
            for (var j = 0; j < deleteElements.indicator.length; j++) {
                deleteElements.indicator[j].classList.remove('for-delete', 'for-delete-bg');
                deleteElements.indicator[j].classList.add('canceled-delete');
            }
            TaskNotification.createNotification('.message-info');
        }
    }, {
        key: 'givePossibilityToDelete',
        value: function givePossibilityToDelete() {
            var taskListElements = TaskList.getTaskListElements;
            var deleteElements = taskDeletorObj.deleteTaskObj;
            for (var l = 0; l < deleteElements.indicator.length; l++) {
                deleteElements.indicator[l].classList.remove('canceled-delete');
                deleteElements.indicator[l].classList.add('for-delete');
            }
            for (var h = 0; h < taskListElements.quantityOfSelectedTasks.length; h++) {
                if (taskListElements.quantityOfSelectedTasks[h].innerHTML === '') {
                    taskListElements.quantityOfSelectedTasks[h].style.display = 'block';
                    taskListElements.quantityOfSelectedTasks[h].innerHTML = 0;
                }
            }
        }
    }, {
        key: 'pushTaskToDelete',
        value: function pushTaskToDelete(event) {
            var taskListElements = TaskList.getTaskListElements;
            if (event.target.classList.contains('indicator')) {
                event.target.classList.add('for-delete-bg');
                selectedTaskHashes.add(event.target.parentNode.parentNode.getAttribute('taskKey'));
                var quantityOfSelectedTasks = selectedTaskHashes.size;
                for (var l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
                    taskListElements.quantityOfSelectedTasks[l].style.display = 'block';
                    taskListElements.quantityOfSelectedTasks[l].innerHTML = quantityOfSelectedTasks;
                }
            }
        }
    }, {
        key: 'submitDeleteTask',
        value: function submitDeleteTask() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = selectedTaskHashes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var selectedTaskHash = _step.value;

                    firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + selectedTaskHash).remove();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            modalWindowController.closeModalWindow(document.getElementById('modal-w-remove'));
            taskDeletorObj.removeIndicatorOfQuantityDel();
            selectedTaskHashes.clear();
            taskElementController.checkIfTaskListEmpty();
            TaskNotification.createNotification('.message-delete');
        }
    }, {
        key: 'checkIfToDeleteTasks',
        value: function checkIfToDeleteTasks() {
            var modalElements = taskDeletorObj.deleteTaskObj;
            if (document.querySelector('.quantity-del-tasks').innerHTML > 0) {
                modalWindowView.downloadRemoveModalWindow();
                modalWindowController.subscribeRemoveTaskModalEvents(modalElements);
            }
            taskDeletorObj.givePossibilityToDelete();
        }
    }, {
        key: 'removeIndicatorOfQuantityDel',
        value: function removeIndicatorOfQuantityDel() {
            var taskListElements = TaskList.getTaskListElements;
            for (var j = 0; j < taskListElements.quantityOfSelectedTasks.length; j++) {
                taskListElements.quantityOfSelectedTasks[j].innerHTML = 0;
                taskListElements.quantityOfSelectedTasks[j].style.display = 'none';
            }
        }
    }, {
        key: 'deleteTaskObj',
        get: function get() {
            return {
                indicator: document.getElementsByClassName('indicator'),
                removeBtn: document.getElementsByClassName('remove-btn'),
                cancelBtn: document.getElementsByClassName('cancel-btn')
            };
        }
    }]);

    return TaskDeletor;
}();

var taskDeletorObj = new TaskDeletor();
//# sourceMappingURL=TaskDeletor-compiled.js.map
