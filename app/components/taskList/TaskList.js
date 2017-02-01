class taskListInitiator {
    static initModalWindowElements() {
        let modalWindowElements = {
            titleInput: document.getElementsByClassName('title-input')[0],
            descriptionInput: document.getElementsByClassName('description-input')[0],
            categoryRadioBtn: document.querySelector('input.category-input:checked + label + label'),
            deadlineInput: document.getElementsByClassName('deadline-input')[0],
            estimationCheckboxes: document.querySelectorAll('input[type="checkbox"]:checked').length,
            priorityRadioBtn: document.querySelector('input[name="priority-level"]:checked + label + label')
        };

        return modalWindowElements;
    }

    static initializeTaskListElements() {
        let taskListElements = {
            globalListBtn: document.getElementsByClassName('btn-wrap')[0],
            quantityOfSelectedTasks: document.getElementsByClassName('quantity-del-tasks')
        };

        return taskListElements;
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
        ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), Reports.downloadReports);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('add-task'), modalWindowObj.addTaskModal);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('select-all-global'), function () {
            TaskListTransfer.addActiveClassSelector(this);
            SelectionManager.selectAll('#globalTasks .task');
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('deselect-all-global'), function () {
            TaskListTransfer.addActiveClassSelector(this);
            SelectionManager.deselectAllSelectedTasks('#globalTasks .task');
        });
        document.querySelector('.priority-list button:first-child').classList.add('active-elem-white');
        setTimeout(function () {
            tasksRenderer.checkIfTaskListEmpty();
        }, 100);
        ElementsListener.listenToEvents('click', document.querySelectorAll('.priority-list button'), filtrationTask.filterTasks);
        $(document).ready(function () {
            let tasksTabs = $("#tasksTabs");
            tasksTabs.tabSwitcher();
            let tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
        });
        window.onscroll = function () {
            if (document.getElementsByClassName('fixed-logo')[0]) {
                let scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled > 50) {
                    document.getElementsByClassName('fixed-logo')[0].style.display = 'block';
                    document.getElementsByClassName('daily-task-list')[0].style.paddingTop = '60px';
                }
            }
        };
        Router.iconLinksBinder();
    }
}


