class TaskElementController {
    get taskElementsObj() {
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
        }
    }

    checkIfTaskListEmpty() {
        taskElementView.clearContainers();
        try {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks').on('value', function (data) {
                let tasksTabs = document.getElementById('tasksTabs');
                let addTaskSection = $('.add-task-sect')[0];
                if (data.val() == null) {
                    classManager.removeClass(addTaskSection, 'non-visible-elem');
                    tasksTabs.classList.add('non-visible-elem');
                }
                else {
                    classManager.removeClass(tasksTabs, 'non-visible-elem');
                    taskElementModel.filterTasks("taskIsDone", false);
                    taskElementModel.filterTasks("taskIsDone", true);
                    try {
                        addTaskSection.classList.add('non-visible-elem');
                    }
                    catch (e) {
                        return false;
                    }
                }
            });
        }
        catch (e) {
            return 'nothing to remove';
        }
    }

    checkIfALLTasksAreDone() {
        try {
            if (document.querySelectorAll('#globalTasks .task, #daily-tasks .task').length == 0) {
                classManager.removeClass(document.getElementsByClassName('done-tasks-sect')[0], 'non-visible-elem');
                document.getElementsByClassName('tasks-intro')[0].classList.add('non-visible-elem');
            }

            else {
                document.getElementsByClassName('done-tasks-sect')[0].classList.add('non-visible-elem');
                classManager.removeClass(document.getElementsByClassName('tasks-intro')[0], 'non-visible-elem');
            }
        } catch (e) {
            return "element is removed";
        }

    }

    generateWordMonth(splitedArray) {
        let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let todayMonth = splitedArray[1];
        for (let k = 0; k < allMonths.length; k++) {
            if (todayMonth == k) {
                todayMonth = allMonths[k - 1];
            }
        }
        return todayMonth;
    }

    notifyAboutMissedDeadlines(deadline) {
        let tasksMissedDeadlines = deadline.split('.');
        let thisDate = new Date();
        thisDate.setDate(thisDate.getDate());
        let deadlineDate = new Date(tasksMissedDeadlines[2], tasksMissedDeadlines[1] - 1, parseInt(tasksMissedDeadlines[0]) + 1);
        if (deadlineDate < thisDate) {
            if (notificationCounter <= 0) {
                NotificationManager.showNotification("You have missed Deadline!", 'assets/img/tomato-failed.png', 'Productivity Tracker');
                notificationCounter++;
            }
        }
    }

    subscribeTaskEvents() {
        let taskElements = taskElementController.taskElementsObj;
        ElementsListener.listenToEvents('click', taskElements.editTaskBtn, TaskList.getIndexOfTask);
        ElementsListener.listenToEvents('click', taskElements.moveTaskBtn, TaskList.getIndexOfMovableTasks);
        ElementsListener.listenToEvents('click', taskElements.indicator, taskDeletorObj.pushTaskToDelete);
        ElementsListener.listenToEvents('click', taskElements.removeTaskBtn, taskDeletorObj.givePossibilityToDelete);
        ElementsListener.listenToEvents('click', taskElements.priorityIndicator, function (event) {
            let taskKey = event.target.parentNode.parentNode.getAttribute('taskkey');
            if (event.target.parentNode.parentNode.classList.contains('done-task')) {
                event.stopImmediatePropagation();
                TaskNotification.createNotification('.message-error');
                return false;
            }
            initialTimerView.showTimer(taskKey);
        });
    }

    addActiveClassSelector(elem) {
        for (let k = 0; k < document.querySelectorAll('.opportunity-select button').length; k++) {
            document.querySelectorAll('.opportunity-select button')[k].style.color = '#8da5b8';
        }
        elem.style.color = 'white';
        return elem.style.color;
    }

    addDefaultData() {
        return new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
    };

    moveTaskToDaily(key) {
        taskElementModel.sendTodayTask(key);
    }

    filterTasksToPriority() {
        taskElementView.clearContainers();
        let priorityFilters = document.querySelectorAll('.priority-list button');

        for (let i = 0; i < priorityFilters.length; i++) {
            classManager.removeClass(priorityFilters[i], 'active-elem-white');
        }
        event.target.classList.add('active-elem-white');
        taskElementModel.filterDataBase();
    }
}

let taskElementController = new TaskElementController();