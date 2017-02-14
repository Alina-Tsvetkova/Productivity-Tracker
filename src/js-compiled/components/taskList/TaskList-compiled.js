'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var index = void 0;

var TaskList = function () {
    function TaskList() {
        _classCallCheck(this, TaskList);
    }

    _createClass(TaskList, null, [{
        key: 'getIndexOfTask',
        value: function getIndexOfTask(event) {
            var allRenderedEditButtons = document.querySelectorAll('.edit');
            var allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
            index = allRenderedEditButtonsArr.indexOf(event.target);
            var key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
            modalWindowController.initEditModalWindow(index, key);
        }
    }, {
        key: 'getIndexOfMovableTasks',
        value: function getIndexOfMovableTasks(event) {
            var allRenderedMoveButtons = document.querySelectorAll('.move-task');
            var allRenderedMoveButtonsArr = Array.prototype.slice.call(allRenderedMoveButtons);
            index = allRenderedMoveButtonsArr.indexOf(event.target);
            var key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
            taskElementController.moveTaskToDaily(key);
        }
    }, {
        key: 'moveToTaskList',
        value: function moveToTaskList() {
            Router.addHash("task-list");
            counterOfTasks = 0;
            var taskBinder = new Binder('app/components/taskList/task-list.html', document.body);
            taskBinder.downloadComponent();

            Icons.downloadMainIcons();

            fixedLogoView.downloadFixedLogo();

            document.querySelector('.priority-list button:first-child').classList.add('active-elem-white');
            setTimeout(function () {
                taskElementController.checkIfTaskListEmpty();
            }, 100);

            Binder.downloadPlugins("#tasksTabs");

            Icons.iconLinksBinder();
            Router.listenToHashChanges();
        }
    }, {
        key: 'subscribeCommonTaskListEvents',
        value: function subscribeCommonTaskListEvents() {
            var commonElements = TaskList.getTaskListElements;
            ElementsListener.listenToEvents('click', commonElements.priorityBtn, taskElementController.filterTasksToPriority);
            ElementsListener.listenToEvents('click', commonElements.removeBtnIcon, taskDeletorObj.checkIfToDeleteTasks);
            ElementsListener.listenToEvents('click', commonElements.addTaskBtn, modalWindowController.initModalWindow);
            ElementsListener.listenToEvents('click', commonElements.selectTasks, function () {
                taskElementController.addActiveClassSelector(this);
                SelectionManager.selectAll('#globalTasks .task');
            });
            ElementsListener.listenToEvents('click', commonElements.deselectTasks, function () {
                taskElementController.addActiveClassSelector(this);
                SelectionManager.deselectAllSelectedTasks('#globalTasks .task');
            });

            window.onscroll = function () {
                if (commonElements.fixedLogo) {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled > 50) {
                        commonElements.fixedLogo.style.display = 'block';
                    }
                }
            };
        }
    }, {
        key: 'getTaskListElements',
        get: function get() {
            return {
                globalListBtn: document.getElementsByClassName('btn-wrap')[0],
                quantityOfSelectedTasks: document.getElementsByClassName('quantity-del-tasks'),
                priorityBtn: document.querySelectorAll('.priority-list button'),
                removeBtnIcon: document.querySelectorAll('.remove-btn-icon'),
                addTaskBtn: document.getElementsByClassName('add-task'),
                selectTasks: document.getElementsByClassName('select-all-global'),
                deselectTasks: document.getElementsByClassName('deselect-all-global'),
                fixedLogo: document.getElementsByClassName('fixed-logo')[0]
            };
        }
    }]);

    return TaskList;
}();
//# sourceMappingURL=TaskList-compiled.js.map
