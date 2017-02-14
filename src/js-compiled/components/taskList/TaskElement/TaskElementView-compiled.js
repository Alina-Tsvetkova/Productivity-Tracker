'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var counterOfTasks = 0;
var notificationCounter = 0;

var TaskElementView = function () {
    function TaskElementView() {
        _classCallCheck(this, TaskElementView);
    }

    _createClass(TaskElementView, [{
        key: 'clearContainers',
        value: function clearContainers() {
            reports.receiveReportsStatistics();
            document.getElementById('globalTasks').innerHTML = '';
            document.getElementById('tab2').innerHTML = '';
            counterOfTasks = 0;
        }
    }, {
        key: 'downloadTaskComponent',
        value: function downloadTaskComponent() {
            var taskBinder = new Binder('app/components/taskList/task/task.html');
            var docTask = taskBinder.downloadComponent();
            return docTask;
        }
    }, {
        key: 'fillTaskWithInformation',
        value: function fillTaskWithInformation(docTask, data, dataKey, bool) {
            var renderedTask = void 0;

            if (!bool) {
                renderedTask = data[dataKey];
            } else if (bool) {
                renderedTask = data;
            }

            var thisCategory = renderedTask.category;
            taskElementView.createCategoryGroup(thisCategory, docTask, renderedTask.colorIndicator, renderedTask, dataKey);

            setTimeout(function () {
                (function fillTaskContainer(dataKey) {
                    try {
                        (function () {
                            var taskObj = taskElementController.taskElementsObj;
                            taskObj.taskTitle[counterOfTasks].innerHTML = renderedTask.title;
                            taskObj.taskTitle[counterOfTasks].classList.add(renderedTask.priority.toLowerCase() + '-sign');
                            taskObj.descriptionContent[counterOfTasks].innerHTML = renderedTask.description;
                            var splitedArray = renderedTask.deadline.split('.');
                            taskElementView.trimDateDeadline(splitedArray);
                            taskObj.monthDeadlineElem[counterOfTasks].innerHTML = taskElementController.generateWordMonth(splitedArray);
                            taskObj.priorityIndicator[counterOfTasks].classList.add(renderedTask.priority.toLowerCase());
                            taskObj.priorityIndicatorSpan[counterOfTasks].innerHTML = renderedTask.estimation;

                            (function addAttributesToTask() {
                                var attributesObj = {
                                    'color-category': renderedTask.colorIndicator,
                                    'taskKey': dataKey,
                                    'taskisdone': renderedTask.taskIsDone
                                };
                                for (var key in attributesObj) {
                                    taskObj.task[counterOfTasks].setAttribute(key, attributesObj[key]);
                                }
                                counterOfTasks++;
                            })();
                        })();
                    } catch (e) {
                        return false;
                    }
                })(dataKey);
            }, 50);
            taskElementController.subscribeTaskEvents();
            taskElementController.checkIfALLTasksAreDone();
        }
    }, {
        key: 'trimDateDeadline',
        value: function trimDateDeadline(splitedArray) {
            var taskElements = taskElementController.taskElementsObj;
            var zeroDelete = splitedArray[0].split('');
            if (zeroDelete[0] == 0) {
                taskElements.dayDeadline[counterOfTasks].innerHTML = zeroDelete[1];
            } else {
                taskElements.dayDeadline[counterOfTasks].innerHTML = splitedArray[0];
            }
        }
    }, {
        key: 'removeMoveTaskBtn',
        value: function removeMoveTaskBtn(ul) {
            ul.getElementsByClassName('move-task')[0].classList.add('non-visible-elem');
        }
    }, {
        key: 'createCategoryGroup',
        value: function createCategoryGroup(category, docTask, indicator, renderedTask) {
            try {
                var ul = document.createElement('ul');
                ul.setAttribute('category', category);
                var h3 = document.createElement('h3');
                h3.innerHTML = category;
                h3.classList.add('categorized-ul-title');
                ul.appendChild(h3);
                ul.classList.add('categorized-ul');
                ul.appendChild(docTask.getElementsByClassName('task')[0]);

                if (renderedTask.taskIsDone == false) {
                    taskElementView.appendTask('globalTasks', ul);
                    taskElementController.notifyAboutMissedDeadlines(renderedTask.deadline);
                } else if (renderedTask.taskIsDone == true) {
                    taskElementView.addDoneClasses(ul);
                }

                ul.setAttribute('color-category', indicator);
                taskElementView.addColorsToCategories();
            } catch (e) {
                return false;
            }
        }
    }, {
        key: 'addDoneClasses',
        value: function addDoneClasses(ul) {
            taskElementView.appendTask('tab2', ul);
            ul.getElementsByClassName('task')[0].classList.add('done-task');
            var doneTasks = document.getElementsByClassName('done-task');
            for (var j = 0; j < doneTasks.length; j++) {
                doneTasks[j].getElementsByClassName('edit')[0].style.display = 'none';
                doneTasks[j].getElementsByClassName('indicator-wrapper')[0].style.display = 'none';
                taskElementView.removeMoveTaskBtn(ul);
            }
        }
    }, {
        key: 'appendTask',
        value: function appendTask(container, ul) {
            document.getElementById(container).appendChild(ul);
        }
    }, {
        key: 'addColorsToCategories',
        value: function addColorsToCategories() {
            var allCategories = document.querySelectorAll('.categorized-ul');
            for (var j = 0; j < allCategories.length; j++) {
                if (allCategories[j].getAttribute('color-category') == 0) {
                    allCategories[j].classList.add('work-group');
                    allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('work-group-title');
                } else if (allCategories[j].getAttribute('color-category') == 1) {
                    allCategories[j].classList.add('education-group');
                    allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('education-group-title');
                } else if (allCategories[j].getAttribute('color-category') == 2) {
                    allCategories[j].classList.add('hobby-group');
                    allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('hobby-group-title');
                } else if (allCategories[j].getAttribute('color-category') == 3) {
                    allCategories[j].classList.add('sport-group');
                    allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('sport-group-title');
                } else if (allCategories[j].getAttribute('color-category') == 4) {
                    allCategories[j].classList.add('other-group');
                    allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('other-group-title');
                }
            }
        }
    }]);

    return TaskElementView;
}();

var taskElementView = new TaskElementView();
//# sourceMappingURL=TaskElementView-compiled.js.map
