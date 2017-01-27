let counterOfTasks = 0;
let counterOfTasksDone = 0;
let allRenderedEditButtons = document.querySelectorAll('.edit');
let allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);

let selectedTaskHashes = new Set();
let moveableTask;
let allTasksToDoFromDatabase = [];
let modalWindowElements = {};
let taskListElements = {};

class taskListInitiator {
    static initModalWindowElements() {
        modalWindowElements.titleInput = document.getElementsByClassName('title-input')[0];
        modalWindowElements.descriptionInput = document.getElementsByClassName('description-input')[0];
        modalWindowElements.categoryRadioBtn = document.querySelector('input.category-input:checked + label + label');
        modalWindowElements.deadlineInput = document.getElementsByClassName('deadline-input')[0];
        modalWindowElements.estimationCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked').length;
        modalWindowElements.priorityRadioBtn = document.querySelector('input[name="priority-level"]:checked + label + label')
    }

    static initializeTaskListElements() {
        taskListElements = {
            globalListBtn: document.getElementsByClassName('btn-wrap')[0],
            quantityOfSelectedTasks: document.getElementsByClassName('quantity-del-tasks'),
        }
    }
}

class funcTask {
    renderTask(data) {
        let taskRequest = new XMLHttpRequest();
        let taskItemParser = new DOMParser();
        taskRequest.open('GET', 'app/components/taskList/task/task.html', false);
        taskRequest.send();
        let docTask = taskItemParser.parseFromString(taskRequest.responseText, "text/html");
        let renderedTask = data.val();
        let thisCategory = renderedTask.category;

        if (renderedTask.taskisdone == true) {
            document.getElementById('tab2').appendChild(docTask.getElementsByClassName('task')[0]);
        }

        else {
            funcTask.createCategoryGroup(thisCategory, docTask, renderedTask.color-indicator);
        }
        let allRenderedTasks = document.querySelectorAll('#globalTasks li');
        let allRenderedTasksArr = Array.prototype.slice.call(allRenderedTasks);
        let regExpDate = /[0-9]{2}/i;

        allTasksToDoFromDatabase.push(data.val());
        function fill(deadline) {
            let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            try {
                let renderedTaskDeadline = deadline.split('.');
                let monthDeadline;

                document.body.getElementsByClassName('task-title')[counterOfTasks].innerHTML = renderedTask.title;
                document.body.getElementsByClassName('task-title')[counterOfTasks].classList.add(renderedTask.priority.toLowerCase() + '-sign');
                document.body.getElementsByClassName('description-content')[counterOfTasks].innerHTML = renderedTask.description;
                document.body.getElementsByClassName('dayDeadline')[counterOfTasks].innerHTML = renderedTask.deadline.match(regExpDate);

                for (let m = 0; m < renderedTaskDeadline.length; m++) {
                    if (parseInt(renderedTaskDeadline[m]) <= 12) {
                        monthDeadline = allMonths[Number(renderedTaskDeadline[m] - 1)];
                    }
                }

                document.body.getElementsByClassName('monthDeadline')[counterOfTasks].innerHTML = monthDeadline.toUpperCase();
                document.body.getElementsByClassName('priority-indicator')[counterOfTasks].classList.add(renderedTask.priority.toLowerCase());
                document.querySelectorAll('.priority-indicator span')[counterOfTasks].innerHTML = renderedTask.estimation;
                document.body.getElementsByClassName('task')[counterOfTasks].setAttribute('category-name', thisCategory);
                document.body.getElementsByClassName('task')[counterOfTasks].setAttribute('color-category', renderedTask.color-indicator);
                document.body.getElementsByClassName('task')[counterOfTasks].setAttribute("taskKey", data.key);
                document.body.getElementsByClassName('task')[counterOfTasks].setAttribute("dailyTask", '' + renderedTask.dailyTask);
                document.body.getElementsByClassName('task')[counterOfTasks].setAttribute("taskisdone", renderedTask.taskisdone);
                productivityObj.moveTaskToDailyGroup(counterOfTasks);
                ++counterOfTasks;
            }
            catch (e) {
                return;
            }
        }

        fill(data.val().deadline);

        setTimeout(function () {
            funcTask.groupTasksByCategory('.task');
        }, 60);

        ElementsListener.listenToEvents('click', document.getElementsByClassName('move-task'), productivityObj.moveTaskToDaily);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('indicator'), productivityObj.pushTaskToDelete);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('priority-indicator'), Timer.showTimer);
        if (document.body.getElementsByClassName('add-task-sect')[0]) {
            document.body.getElementsByClassName('add-task-sect')[0].style.display = 'none';
        }
        $.fn.tooltipSwitcher();
    }

    createTaskFieldDone(data) {
        let taskRequest = new XMLHttpRequest();
        let taskItemParser = new DOMParser();
        taskRequest.open('GET', 'app/components/taskList/task/task.html', false);
        taskRequest.send();
        let docTask = taskItemParser.parseFromString(taskRequest.responseText, "text/html");
        let renderedTask = data.val();
        if (data.val().taskisdone == 'true') {
            document.getElementById('tab2').appendChild(docTask.getElementsByClassName('task')[0]);
        }

        else {
            document.getElementById('globalTasks').appendChild(docTask.getElementsByClassName('task')[0]);
        }

        let allRenderedTasks = document.querySelectorAll('#tab2 li');
        let allRenderedTasksArr = Array.prototype.slice.call(allRenderedTasks);
        let regExpDate = /[0-9]{2}/i;
        let regExpMonth = /[A-Za-z]+/i;
        allTasksToDoFromDatabase.push(data.val());
        function fill(deadline) {
            let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let renderedTaskDeadline = deadline.split('.');
            let monthDeadline;
            for (let m = 0; m < renderedTaskDeadline.length; m++) {
                if (parseInt(renderedTaskDeadline[m]) <= 12) {
                    monthDeadline = allMonths[Number(renderedTaskDeadline[m] - 1)];
                }
            }
            document.body.querySelectorAll('#tab2 .task-title')[counterOfTasksDone].innerHTML = renderedTask.title;
            document.body.querySelectorAll('#tab2 .task-title')[counterOfTasksDone].classList.add(renderedTask.priority.toLowerCase() + '-sign');
            document.body.querySelectorAll('#tab2 .task-title')[counterOfTasksDone].classList.add('done-task-title');
            document.body.querySelectorAll('#tab2 .description-content')[counterOfTasksDone].innerHTML = renderedTask.description;
            document.body.querySelectorAll('#tab2 .description-content')[counterOfTasksDone].classList.add('done-task-title');
            document.body.querySelectorAll('#tab2 .dayDeadline')[counterOfTasksDone].innerHTML = renderedTask.deadline.match(regExpDate);
            document.body.querySelectorAll('#tab2 .monthDeadline')[counterOfTasksDone].innerHTML = monthDeadline.toUpperCase();
            document.body.querySelectorAll('#tab2 .priority-indicator')[counterOfTasksDone].classList.add(renderedTask.priority.toLowerCase());
            document.querySelectorAll('#tab2 .priority-indicator span')[counterOfTasksDone].innerHTML = renderedTask.estimation;
            let thisCategory = renderedTask.category;
            document.body.querySelectorAll('#tab2 .task')[counterOfTasksDone].classList.add('done-task');
            document.body.querySelectorAll('#tab2 .task')[counterOfTasksDone].setAttribute('category-name', thisCategory);
            document.body.querySelectorAll('#tab2 .task')[counterOfTasksDone].setAttribute('color-category', renderedTask.colorIndicator);
            document.body.querySelectorAll('#tab2 .task')[counterOfTasksDone].setAttribute("taskKey", data.key);
            document.body.querySelectorAll('#tab2 .task')[counterOfTasksDone].setAttribute("dailyTask", '' + renderedTask.dailyTask);
            document.body.querySelectorAll('#tab2 .task')[counterOfTasksDone].setAttribute("taskisdone", renderedTask.taskisdone);
            ++counterOfTasksDone;
        }

        fill(data.val().deadline);
    }

    static createCategoryGroup(category, docTask, indicator) {
        var ul = document.createElement('ul');
        ul.setAttribute('category', category);
        var h3 = document.createElement('h3');
        h3.innerHTML = category;
        h3.classList.add('categorized-ul-title');
        ul.appendChild(h3);
        ul.classList.add('categorized-ul');
        ul.appendChild(docTask.getElementsByClassName('task')[0]);
        document.getElementById('globalTasks').appendChild(ul);
        ul.setAttribute('color-category', indicator);

        funcTask.addColorsToCategories();

    }

    static addColorsToCategories() {
        let allCategories = document.querySelectorAll('.categorized-ul');
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


    createTaskField(data) {
        productivityObj.renderTask(data);
        if (document.querySelectorAll('#globalTasks .task').length > 0) {
            taskListElements.globalListBtn.style.display = 'block';
            document.getElementsByClassName('opportunity-select')[0].style.display = 'block';
            document.getElementsByClassName('opportunity-select')[1].style.display = 'block';
            document.getElementsByClassName('priority-list')[0].style.display = 'block';
            document.getElementsByClassName('toggle-doneable')[0].style.display = 'block';
        }


        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
    }

    static groupTasksByCategory(elems) {
        let allTasksToDo = document.querySelectorAll(elems);
        for (var j = 0; j < allTasksToDo.length; j++) {
            let thisCategory = allTasksToDo[j].getAttribute('color-category');
            if (allTasksToDo[j].getAttribute('color-category') == 0) {
                allTasksToDo[j].getElementsByClassName('indicator')[0].classList.add('work');
            }

            else if (allTasksToDo[j].getAttribute('color-category') == 1) {
                allTasksToDo[j].getElementsByClassName('indicator')[0].classList.add('education');
            }

            else if (allTasksToDo[j].getAttribute('color-category') == 2) {
                allTasksToDo[j].getElementsByClassName('indicator')[0].classList.add('hobby');
            }

            else if (allTasksToDo[j].getAttribute('color-category') == 3) {
                allTasksToDo[j].getElementsByClassName('indicator')[0].classList.add('sport');
            }

            else if (allTasksToDo[j].getAttribute('color-category') == 4) {
                allTasksToDo[j].getElementsByClassName('indicator')[0].classList.add('other');

            }
        }
    }

    ifTaskPresent() {
        document.getElementById('globalTasks').innerHTML = '';
        document.getElementById('daily-tasks').innerHTML = '';
        allTasksToDo.on('child_added', function (data) {
            productivityObj.createTaskField(data);
            funcTask.notifyAboutMissedDeadlines(data.val());
        });
        allTasksDone.on('child_added', function (data) {
            productivityObj.createTaskFieldDone(data);
        });
        if (document.getElementsByClassName('task').length === 0) {
            taskListElements.globalListBtn.style.display = 'none';
            document.getElementsByClassName('opportunity-select')[0].style.display = 'none';
            document.getElementsByClassName('opportunity-select')[1].style.display = 'none';
            document.getElementsByClassName('priority-list')[0].style.display = 'none';
            document.getElementsByClassName('toggle-doneable')[0].style.display = 'none';
        }
    }

    removeIndicatorOfQuantityDel() {
        for (let j = 0; j < taskListElements.quantityOfSelectedTasks.length; j++) {
            taskListElements.quantityOfSelectedTasks[j].innerHTML = 0;
            taskListElements.quantityOfSelectedTasks[j].style.display = 'none';
        }
    }

    cancelDeletion() {
        selectedTaskHashes.clear();
        productivityObj.removeIndicatorOfQuantityDel();
        ModalWindow.closeModalWindow(document.getElementById('modal-w-remove'));
        for (var j = 0; j < document.getElementsByClassName('indicator').length; j++) {
            document.getElementsByClassName('indicator')[j].classList.remove('for-delete', 'for-delete-bg');
            document.getElementsByClassName('indicator')[j].classList.add('canceled-delete');
        }

        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-info');
    }

    givePossibilityToDelete() {
        let allTrashViews = document.getElementsByClassName('indicator');
        for (let l = 0; l < allTrashViews.length; l++) {
            document.getElementsByClassName('indicator')[l].classList.remove('canceled-delete');
            allTrashViews[l].classList.add('for-delete');
        }
        for (let h = 0; h < taskListElements.quantityOfSelectedTasks.length; h++) {
            if (taskListElements.quantityOfSelectedTasks[h].innerHTML === '') {
                taskListElements.quantityOfSelectedTasks[h].style.display = 'block';
                taskListElements.quantityOfSelectedTasks[h].innerHTML = 0;
            }
        }
    }

    pushTaskToDelete() {
        if (event.target.classList.contains('indicator')) {
            let quantityOfSelectedTasks = +taskListElements.quantityOfSelectedTasks[1].innerHTML;
            event.target.classList.add('for-delete-bg');
            selectedTaskHashes.add(event.target.parentNode.parentNode.getAttribute('taskKey'));
            console.log(selectedTaskHashes);
            quantityOfSelectedTasks = selectedTaskHashes.size;
            for (let l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
                taskListElements.quantityOfSelectedTasks[l].style.display = 'block';
                taskListElements.quantityOfSelectedTasks[l].innerHTML = quantityOfSelectedTasks;
            }
        }

        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-warn');
    }


    static minusQuantityOfDeleted(quantityDeletedTasks) {
        for (let h = 0; h < taskListElements.quantityOfSelectedTasks.length; h++) {
            taskListElements.quantityOfSelectedTasks[h].innerHTML = quantityDeletedTasks;
        }
    }

    moveTaskToDailyGroup(i) {
        if (document.getElementsByClassName('task')[i].getAttribute('dailyTask') == 'true') {
            console.log(document.getElementById('daily-tasks'));
            document.querySelectorAll('.categorized-ul')[i].getElementsByClassName('move-task')[0].style.display = 'none';
            document.querySelectorAll('.categorized-ul')[i].getElementsByClassName('edit')[0].style.marginTop = '15px';
            document.getElementById('daily-tasks').appendChild(document.getElementsByClassName('categorized-ul')[i]);
        }
    }

    moveTaskToDaily() {
        console.log('daily');

        if (document.querySelectorAll('#daily-tasks .task ').length >= 5) {
            let newNotification = new TaskNotification();
            newNotification.wrapNotificationFunctionality('.message-error');
            return;
        }
        else {
            let updates = {
                dailyTask: true
            }
            let allMoveButtons = Array.prototype.slice.call(document.querySelectorAll('#globalTasks .move-task'));
            let index = allMoveButtons.indexOf(event.target);
            let allTasksToDo = document.querySelectorAll('#globalTasks .task');
            moveableTask = allTasksToDo[index].getAttribute('taskKey');
            tasks.ref('tasksToDo/' + moveableTask).update(updates);
            document.getElementsByClassName('added-task')[0].style.display = 'none';
            document.querySelectorAll('#globalTasks .task')[index].setAttribute('dailyTask', 'true');
            console.log(document.querySelectorAll('#globalTasks .task')[index]);
            document.querySelectorAll('#globalTasks .categorized-ul')[index].getElementsByClassName('move-task')[0].style.display = 'none';
            document.querySelectorAll('#globalTasks .categorized-ul')[index].getElementsByClassName('edit')[0].style.marginTop = '15px';
            document.getElementById('daily-tasks').appendChild(document.querySelectorAll('#globalTasks .categorized-ul')[index]);
        }
    }


    offerToDragTask() {
        document.getElementsByClassName('added-task')[0].style.display = 'block';
    }


    static notifyAboutMissedDeadlines(task) {
        let thisDate = new Date();
        thisDate.setDate(thisDate.getDate() - 1);
        let taskDeadline = task.deadline;
        let parsedTaskDeadline = taskDeadline.split('.');
        let k = 0;
        parsedTaskDeadline.forEach(function (item) {
            parsedTaskDeadline[k] = Number(item);
            k++;
        })

        let dayDeadlineDate, monthDeadlineDate, yearDeadlineDate;
        let dayRegExp = /^[0-9]{4}$/i;
        for (let i = 0; i < parsedTaskDeadline.length; i++) {
            if (parsedTaskDeadline[i] <= 12) {
                monthDeadlineDate = parsedTaskDeadline[i];
            }
            else if (parsedTaskDeadline[i] <= 31) {
                dayDeadlineDate = parsedTaskDeadline[i];
            }
            else {
                yearDeadlineDate = parsedTaskDeadline[i];
            }
        }

        let taskDeadlineDate = new Date(yearDeadlineDate, monthDeadlineDate - 1, dayDeadlineDate);
        let monthDeadlineWord;
        let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        monthDeadlineWord = allMonths[monthDeadlineDate - 1];

        if (taskDeadlineDate < thisDate) {
            NotificationManager.showNotification("You have missed Deadline on " + task.title + ' from ' + dayDeadlineDate + ' ' + monthDeadlineWord
                + '!', 'images/tomato-failed.png', 'Productivity Tracker');
        }
    }
}

class TaskListTransfer {
    static addActiveClassSelector(elem) {
        for (let k = 0; k < document.querySelectorAll('.opportunity-select button').length; k++) {
            document.querySelectorAll('.opportunity-select button')[k].style.color = '#8da5b8';
        }
        elem.style.color = 'white';
    }

    static moveToTaskList() {
        let taskBinder = new Binder('app/components/taskList/task-list.html', document.body);
        taskBinder.downloadComponent();
        taskListInitiator.initializeTaskListElements();
        taskListInitiator.initModalWindowElements();
        //ElementsListener.listenToEvents('click', document.getElementsByClassName('add-task'), modalWindowObj.addTaskModal);
        //ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), Reports.downloadReports);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('icon-add-task'), productivityManager.submitTask);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('select-all-global'), function () {
            TaskListTransfer.addActiveClassSelector(this);
            SelectionManager.selectAll('#globalTasks .task');
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('select-all-daily'), function () {
            TaskListTransfer.addActiveClassSelector(this);
            SelectionManager.selectAll('#daily-tasks .task');
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('deselect-all-global'), function () {
            TaskListTransfer.addActiveClassSelector(this);
            SelectionManager.deselectAllSelectedTasks('#globalTasks .task');
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('deselect-all-daily'), function () {
            TaskListTransfer.addActiveClassSelector(this);
            SelectionManager.deselectAllSelectedTasks('#daily-tasks .task');
        });


        productivityObj.ifTaskPresent();
        priorityFilters = document.querySelectorAll('.priority-list button');
        for (var i = 0; i < priorityFilters.length; i++) {
            priorityFilters[i].addEventListener('click', filtrationTask.filterTasks, false);
        }
        $(document).ready(function () {
            let tasksTabs = $("#tasksTabs");
            tasksTabs.tabSwitcher();
            $.fn.accordionSwitcher();
            let tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
        });

        ElementsListener.listenToEvents('scroll', window, function () {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > 100) {
                document.getElementsByClassName('fixed-logo')[0].style.display = 'block';
                document.getElementsByClassName('daily-task-list')[0].style.paddingTop = '60px';
            }
        });

    }
}

let productivityObj = new funcTask();
let productivityManager = new TaskManager();

