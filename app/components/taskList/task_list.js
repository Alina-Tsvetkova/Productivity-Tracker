let counterOfTasksDone = 0;
let allRenderedEditButtons = document.querySelectorAll('.edit');
let allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);


let moveableTask;

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

    static groupTasksByCategory(elems) {
        let allTasksToDo = document.querySelectorAll(elems);
        for (let j = 0; j < allTasksToDo.length; j++) {
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
        ElementsListener.listenToEvents('click', document.getElementsByClassName('add-task'), modalWindowObj.addTaskModal);
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
        document.querySelector('.priority-list button:first-child').classList.add('active-elem-white');

        tasksRenderer.ifTaskPresent();
        let priorityFilters = document.querySelectorAll('.priority-list button');
        for (let i = 0; i < priorityFilters.length; i++) {
            priorityFilters[i].addEventListener('click', filtrationTask.filterTasks, false);
        }
        $(document).ready(function () {
            let tasksTabs = $("#tasksTabs");
            tasksTabs.tabSwitcher();
            $.fn.accordionSwitcher();
            let tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
        });

        window.onscroll = function () {
            if (document.getElementsByClassName('fixed-logo')[0]) {
                let scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled > 100) {
                    document.getElementsByClassName('fixed-logo')[0].style.display = 'block';
                    document.getElementsByClassName('daily-task-list')[0].style.paddingTop = '60px';
                }
            }
        }
    }
}

let productivityObj = new funcTask();


