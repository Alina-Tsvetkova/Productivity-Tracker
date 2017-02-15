'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskElementController = function () {
    function TaskElementController() {
        _classCallCheck(this, TaskElementController);
    }

    _createClass(TaskElementController, [{
        key: 'checkIfTaskListEmpty',
        value: function checkIfTaskListEmpty() {
            taskElementView.clearContainers();
            try {
                firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').on('value', function (data) {
                    var tasksTabs = document.getElementById('tasksTabs');
                    var addTaskSection = $('.add-task-sect')[0];
                    if (data.val() == null) {
                        classManager.removeClass(addTaskSection, 'non-visible-elem');
                        tasksTabs.classList.add('non-visible-elem');
                    } else {
                        classManager.removeClass(tasksTabs, 'non-visible-elem');
                        taskElementModel.filterTasks("taskIsDone", false);
                        taskElementModel.filterTasks("taskIsDone", true);
                        try {
                            addTaskSection.classList.add('non-visible-elem');
                        } catch (e) {
                            return false;
                        }
                    }
                });
            } catch (e) {
                return 'nothing to remove';
            }
        }
    }, {
        key: 'checkIfALLTasksAreDone',
        value: function checkIfALLTasksAreDone() {
            try {
                if (document.querySelectorAll('#globalTasks .task, #daily-tasks .task').length == 0) {
                    classManager.removeClass(document.getElementsByClassName('done-tasks-sect')[0], 'non-visible-elem');
                    document.getElementsByClassName('tasks-intro')[0].classList.add('non-visible-elem');
                } else {
                    document.getElementsByClassName('done-tasks-sect')[0].classList.add('non-visible-elem');
                    classManager.removeClass(document.getElementsByClassName('tasks-intro')[0], 'non-visible-elem');
                }
            } catch (e) {
                return "element is removed";
            }
        }
    }, {
        key: 'generateWordMonth',
        value: function generateWordMonth(splitedArray) {
            var allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var todayMonth = splitedArray[1];
            for (var k = 0; k < allMonths.length; k++) {
                if (todayMonth == k) {
                    todayMonth = allMonths[k - 1];
                }
            }
            return todayMonth;
        }
    }, {
        key: 'notifyAboutMissedDeadlines',
        value: function notifyAboutMissedDeadlines(deadline) {
            var tasksMissedDeadlines = deadline.split('.');
            var thisDate = new Date();
            thisDate.setDate(thisDate.getDate());
            var deadlineDate = new Date(tasksMissedDeadlines[2], tasksMissedDeadlines[1] - 1, parseInt(tasksMissedDeadlines[0]) + 1);
            if (deadlineDate < thisDate) {
                if (notificationCounter <= 0) {
                    NotificationManager.showNotification("You have missed Deadline!", 'assets/img/tomato-failed.png', 'Productivity Tracker');
                    notificationCounter++;
                }
            }
        }
    }, {
        key: 'subscribeTaskEvents',
        value: function subscribeTaskEvents() {
            var taskElements = taskElementController.taskElementsObj;
            ElementsListener.listenToEvents('click', taskElements.editTaskBtn, TaskList.getIndexOfTask);
            ElementsListener.listenToEvents('click', taskElements.moveTaskBtn, TaskList.getIndexOfMovableTasks);
            ElementsListener.listenToEvents('click', taskElements.indicator, taskDeletorObj.pushTaskToDelete);
            ElementsListener.listenToEvents('click', taskElements.removeTaskBtn, taskDeletorObj.givePossibilityToDelete);
            ElementsListener.listenToEvents('click', taskElements.priorityIndicator, function (event) {
                var taskKey = event.target.parentNode.parentNode.getAttribute('taskkey');
                if (event.target.parentNode.parentNode.classList.contains('done-task')) {
                    event.stopImmediatePropagation();
                    TaskNotification.createNotification('.message-error');
                    return false;
                }
                initialTimerView.showTimer(taskKey);
            });
        }
    }, {
        key: 'addActiveClassSelector',
        value: function addActiveClassSelector(elem) {
            for (var k = 0; k < document.querySelectorAll('.opportunity-select button').length; k++) {
                document.querySelectorAll('.opportunity-select button')[k].style.color = '#8da5b8';
            }
            elem.style.color = 'white';
            return elem.style.color;
        }
    }, {
        key: 'addDefaultData',
        value: function addDefaultData() {
            return new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
        }
    }, {
        key: 'moveTaskToDaily',
        value: function moveTaskToDaily(key) {
            taskElementModel.sendTodayTask(key);
        }
    }, {
        key: 'filterTasksToPriority',
        value: function filterTasksToPriority() {
            taskElementView.clearContainers();
            var priorityFilters = document.querySelectorAll('.priority-list button');

            for (var i = 0; i < priorityFilters.length; i++) {
                classManager.removeClass(priorityFilters[i], 'active-elem-white');
            }
            event.target.classList.add('active-elem-white');
            taskElementModel.filterDataBase();
        }
    }, {
        key: 'taskElementsObj',
        get: function get() {
            return {
                task: document.getElementsByClassName('task'),
                taskTitle: document.getElementsByClassName('task-title'),
                monthDeadlineElem: document.getElementsByClassName('monthDeadline'),
                priorityIndicator: document.getElementsByClassName('priority-indicator'),
                descriptionContent: document.getElementsByClassName('description-content'),
                priorityIndicatorSpan: document.querySelectorAll('.priority-indicator span'),
                editTaskBtn: document.getElementsByClassName('edit'),
                moveTaskBtn: document.getElementsByClassName('move-task'),
                indicator: document.getElementsByClassName('indicator'),
                removeTaskBtn: document.getElementsByClassName('remove-btn-icon'),
                dayDeadline: document.getElementsByClassName('dayDeadline')
            };
        }
    }]);

    return TaskElementController;
}();

var taskElementController = new TaskElementController();
//# sourceMappingURL=TaskElementController-compiled.js.map
