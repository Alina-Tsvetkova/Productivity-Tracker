let index;
class TaskList {
    static get getTaskListElements() {
        return {
            globalListBtn: document.getElementsByClassName('btn-wrap')[0],
            quantityOfSelectedTasks: document.getElementsByClassName('quantity-del-tasks')
        }
    }

    static getIndexOfTask(event) {
        let allRenderedEditButtons = document.querySelectorAll('.edit');
        let allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
        index = allRenderedEditButtonsArr.indexOf(event.target);
        let key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
        modalWindowController.initEditModalWindow(index, key);
    }

    static getIndexOfMovableTasks(event) {
        let allRenderedMoveButtons = document.querySelectorAll('.move-task');
        let allRenderedMoveButtonsArr = Array.prototype.slice.call(allRenderedMoveButtons);
        index = allRenderedMoveButtonsArr.indexOf(event.target);
        let key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
        //dailyTask.moveTaskToDaily(key);
    }

    static moveToTaskList() {
        Router.addHash("task-list");
        counterOfTasks = 0;
        let taskBinder = new Binder('app/components/taskList/task-list.html', document.body);
        taskBinder.downloadComponent();
        TaskList.getTaskListElements;
        Icons.downloadMainIcons();
        let headerBinder = new Binder('app/components/fixed-logo/fixed-logo.html');
        let headerDoc = headerBinder.downloadComponent();
        document.body.appendChild(headerDoc.getElementsByClassName('fixed-logo')[0]);
        TaskList.subscribeCommonTaskListEvents();
        document.querySelector('.priority-list button:first-child').classList.add('active-elem-white');
        setTimeout(function () {
            taskElementController.checkIfTaskListEmpty();
        }, 100);

        $(document).ready(function () {
            let tasksTabs = $("#tasksTabs");
            tasksTabs.tabSwitcher();
            $.fn.accordionSwitcher();
            let tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
        });

        Icons.iconLinksBinder();
        Router.listenToHashChanges();
    }

    static subscribeCommonTaskListEvents() {
        ElementsListener.listenToEvents('click', document.querySelectorAll('.priority-list button'), filtrationTask.filterTasks);
        ElementsListener.listenToEvents('click', document.querySelectorAll('.remove-btn-icon'), taskDeletorObj.checkIfToDeleteTasks);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), Reports.downloadReports);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('add-task'), modalWindowController.initModalWindow);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('select-all-global'), function () {
            taskElementController.addActiveClassSelector(this);
            SelectionManager.selectAll('#globalTasks .task');
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('deselect-all-global'), function () {
            taskElementController.addActiveClassSelector(this);
            SelectionManager.deselectAllSelectedTasks('#globalTasks .task');
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
    }
}


