'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskManager = function () {
    function TaskManager() {
        _classCallCheck(this, TaskManager);
    }

    _createClass(TaskManager, [{
        key: 'submitTask',
        value: function submitTask() {
            var modalWindowElements = modalWindowController.getModalWindowElements;
            var postData = {
                title: modalWindowElements.titleInput.value,
                description: modalWindowElements.descriptionInput.value,
                category: modalWindowElements.categoryRadioBtn.innerHTML,
                deadline: modalWindowElements.deadlineInput.value,
                estimation: modalWindowElements.estimationCheckboxes,
                priority: modalWindowElements.priorityRadioBtn.innerHTML,
                colorIndicator: null,
                taskIsDone: false,
                timerIsOn: false,
                startOfTimer: 0,
                timerIterations: 0,
                dateOfFinish: null,
                dailyTask: false
            };

            var allCategoriesNames = document.getElementsByClassName('category-input');
            var allCategoriesValues = [];
            for (var j = 0; j < allCategoriesNames.length; j++) {
                allCategoriesValues.push(allCategoriesNames[j].value);
            }
            var foundCategory = allCategoriesValues.indexOf(postData.category);

            postData.colorIndicator = foundCategory - 1;

            if (postData.deadline == '') {
                postData.deadline = taskElementController.addDefaultData();
            }

            taskElementModel.sendSubmittedData(postData);
            modalWindowController.closeModalWindow(document.getElementById('modal-window-elem'));

            TaskNotification.createNotification('.message-success');
            taskElementController.checkIfALLTasksAreDone();
        }
    }, {
        key: 'saveEditedTask',
        value: function saveEditedTask(index) {
            var editModalElements = productivityManager.editModalWindowElem;
            var updates = {};
            updates.title = editModalElements.titleField.value;
            updates.description = editModalElements.descriptionField.value;
            updates.category = editModalElements.checkedCategory.value;
            updates.priority = editModalElements.checkedPriority.innerHTML;
            updates.deadline = editModalElements.deadlineInput.value;
            updates.estimation = editModalElements.checkedEstimation.length;

            if (editModalElements.deadlineInput.value == '') {
                var editedToday = taskElementController.addDefaultData();
                updates.deadline = editedToday;
            }

            var allCategoriesValues = [];
            for (var j = 0; j < editModalElements.allCategoriesNames.length; j++) {
                allCategoriesValues.push(editModalElements.allCategoriesNames[j].value);
            }
            updates.colorIndicator = allCategoriesValues.indexOf(updates.category) - 1;
            var editedHash = document.getElementsByClassName('task')[index].getAttribute('taskKey');
            taskElementModel.sendEditedData(updates, editedHash);
            modalWindowController.closeModalWindow(document.getElementById('modal-window-elem-edit'));
        }
    }, {
        key: 'editModalWindowElem',
        get: function get() {
            return {
                titleField: document.getElementsByClassName('title-input')[0],
                descriptionField: document.getElementsByClassName('description-input')[0],
                checkedCategory: document.querySelector('input.category-input:checked'),
                checkedPriority: document.querySelector('input[name="priority-level"]:checked + label + label'),
                deadlineInput: document.getElementsByClassName('deadline-input')[0],
                checkedEstimation: document.querySelectorAll('.tomato-estim:checked'),
                allCategoriesNames: document.getElementsByClassName('category-input')
            };
        }
    }]);

    return TaskManager;
}();

var productivityManager = new TaskManager();
//# sourceMappingURL=Task-Manager-compiled.js.map
