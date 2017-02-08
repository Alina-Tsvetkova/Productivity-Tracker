let counterOfTasks = 0;
let notificationCounter = 0;

class TaskRenderer extends TaskManager {

    clearContainers() {
        reports.clearReportsStatistics();
        document.getElementById('globalTasks').innerHTML = '';
        document.getElementById('daily-tasks').innerHTML = '';
        document.getElementById('tab2').innerHTML = '';
        counterOfTasks = 0;
    }

    checkIfTaskListEmpty() {
        tasksRenderer.clearContainers();
        try {
            firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').on('value', function (data) {
                let tasksTabs = document.getElementById('tasksTabs');
                let addTaskSection = $('.add-task-sect')[0];
                if (data.val() == null) {
                    classManager.removeClass(addTaskSection, 'non-visible-elem');
                    tasksTabs.classList.add('non-visible-elem');
                }
                else {
                    classManager.removeClass(tasksTabs, 'non-visible-elem');
                    taskDataObj.filterPendingTasks();
                    taskDataObj.filterToDoTasks();
                    taskDataObj.filterDoneTasks();
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
        if (document.querySelectorAll('#globalTasks .task, #daily-tasks .task').length == 0) {
            classManager.removeClass(document.getElementsByClassName('done-tasks-sect')[0], 'non-visible-elem');
        }
        else {
            document.getElementsByClassName('done-tasks-sect')[0].classList.add('non-visible-elem');
        }
    }

    renderTask(data, dataKey, bool) {
        let taskBinder = new Binder('app/components/taskList/task/task.html');
        let docTask = taskBinder.downloadComponent();

        let renderedTask;

        if (!(bool)) {
            renderedTask = data[dataKey];
        }
        else if (bool) {
            renderedTask = data;
        }
        let thisCategory = renderedTask.category;
        TaskRenderer.createCategoryGroup(thisCategory, docTask, renderedTask.colorIndicator, renderedTask, dataKey);

        setTimeout(function () {
            (function fillTaskContainer(dataKey) {
                tasksRenderer.checkIfALLTasksAreDone();
                try {
                    let task = $('.task');
                    let taskTitle = $('.task-title');
                    let monthDeadlineElem = $('.monthDeadline');
                    let priorityIndicator = $('.priority-indicator');
                    let descriptionContent = $('.description-content');
                    taskTitle[counterOfTasks].innerHTML = renderedTask.title;
                    taskTitle[counterOfTasks].classList.add(renderedTask.priority.toLowerCase() + '-sign');
                    descriptionContent[counterOfTasks].innerHTML = renderedTask.description;
                    let splitedArray = renderedTask.deadline.split('.');

                    tasksRenderer.trimDateDeadline(splitedArray);
                    let todayMonth = tasksRenderer.generateWordMonth(splitedArray);

                    monthDeadlineElem[counterOfTasks].innerHTML = todayMonth;
                    priorityIndicator[counterOfTasks].classList.add(renderedTask.priority.toLowerCase());
                    $('.priority-indicator span')[counterOfTasks].innerHTML = renderedTask.estimation;

                    (function addAttributesToTask() {
                        let attributesObj = {
                            'color-category': renderedTask.colorIndicator,
                            'taskKey': dataKey,
                            'taskisdone': renderedTask.taskIsDone
                        };
                        for (let key in attributesObj) {
                            task[counterOfTasks].setAttribute(key, attributesObj[key]);
                        }
                        counterOfTasks++;
                    }());
                }
                catch (e) {
                    return false;
                }
            }(dataKey));
        }, 100);

        ElementsListener.listenToEvents('click', document.getElementsByClassName('edit'), TaskList.getIndexOfTask);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('move-task'), TaskList.getIndexOfMovableTasks);
        ElementsListener.listenToEvents('click', $('.indicator'), taskDeletorObj.pushTaskToDelete);
        ElementsListener.listenToEvents('click', $('.remove-btn-icon'), taskDeletorObj.givePossibilityToDelete);
        ElementsListener.listenToEvents('click', $('.priority-indicator'), function () {
            let taskKey = event.target.parentNode.parentNode.getAttribute('taskkey');
            if (event.target.parentNode.parentNode.classList.contains('done-task')) {
                event.stopImmediatePropagation();
                TaskNotification.createNotification('.message-error');
                return false;
            }
            Timer.showTimer(taskKey);
        });
    }

    trimDateDeadline(splitedArray) {
        let zeroDelete = splitedArray[0].split('');
        if (zeroDelete[0] == 0) {
            $('.dayDeadline')[counterOfTasks].innerHTML = zeroDelete[1];
        }
        else {
            $('.dayDeadline')[counterOfTasks].innerHTML = splitedArray[0];
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

    static createCategoryGroup(category, docTask, indicator, renderedTask) {
        try {
            let ul = document.createElement('ul');
            ul.setAttribute('category', category);
            let h3 = document.createElement('h3');
            h3.innerHTML = category;
            h3.classList.add('categorized-ul-title');
            ul.appendChild(h3);
            ul.classList.add('categorized-ul');
            ul.appendChild(docTask.getElementsByClassName('task')[0]);

            if (renderedTask.taskIsDone == false) {
                tasksRenderer.appendTask('globalTasks', ul);
                tasksRenderer.notifyAboutMissedDeadlines(renderedTask.deadline);
            }
            else if (renderedTask.taskIsDone == true) {
                tasksRenderer.addDoneClasses(ul);
            }

            else if (renderedTask.taskIsDone === 'pending') {
                tasksRenderer.addPendingClasses(ul);
            }

            ul.setAttribute('color-category', indicator);
            TaskRenderer.addColorsToCategories();
        }
        catch (e) {
            return false;
        }
    }

    addDoneClasses(ul) {
        tasksRenderer.appendTask('tab2', ul);
        ul.getElementsByClassName('task')[0].classList.add('done-task');
        let doneTasks = document.getElementsByClassName('done-task');
        for (let j = 0; j < doneTasks.length; j++) {
            doneTasks[j].getElementsByClassName('edit')[0].style.display = 'none';
            tasksRenderer.removeMoveTaskBtn(ul);
        }
    }

    addPendingClasses(ul) {
        ul.getElementsByClassName('task')[0].classList.add('pending-task');
        tasksRenderer.appendTask('daily-tasks', ul);
        tasksRenderer.removeMoveTaskBtn(ul);
        ul.getElementsByClassName('edit')[0].classList.add('edit-daily-task');
    }

    appendTask(container, ul) {
        document.getElementById(container).appendChild(ul);
    }

    removeMoveTaskBtn(ul) {
        ul.getElementsByClassName('move-task')[0].classList.add('non-visible-elem');
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

    static addColorsToCategories() {
        let allCategories = document.querySelectorAll('.categorized-ul');

        let mapCategoriesTitles = {
            0: 'work-group-title',
            1: 'education-group-title',
            2: 'hobby-group-title',
            3: 'sport',
            4: 'other'
        };

        for (let j = 0; j < allCategories.length; j++) {
            if (allCategories[j].getAttribute('color-category') == 0) {
                allCategories[j].classList.add('work-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('work-group-title');
            }
            else if (allCategories[j].getAttribute('color-category') == 1) {
                allCategories[j].classList.add('education-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('education-group-title');
            }
            else if (allCategories[j].getAttribute('color-category') == 2) {
                allCategories[j].classList.add('hobby-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('hobby-group-title');
            }
            else if (allCategories[j].getAttribute('color-category') == 3) {
                allCategories[j].classList.add('sport-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('sport-group-title');
            }

            else if (allCategories[j].getAttribute('color-category') == 4) {
                allCategories[j].classList.add('other-group');
                allCategories[j].getElementsByClassName('categorized-ul-title')[0].classList.add('other-group-title');
            }
        }
    }

    static addActiveClassSelector(elem) {
        for (let k = 0; k < document.querySelectorAll('.opportunity-select button').length; k++) {
            document.querySelectorAll('.opportunity-select button')[k].style.color = '#8da5b8';
        }
        elem.style.color = 'white';
    }
}

let tasksRenderer = new TaskRenderer();