let index;
class TaskList {
    static get getTaskListElements() {
        return {
            globalListBtn: document.getElementsByClassName('btn-wrap')[0],
            quantityOfSelectedTasks: document.getElementsByClassName('quantity-del-tasks'),
            priorityBtn: document.querySelectorAll('.priority-list button'),
            removeBtnIcon: document.querySelectorAll('.remove-btn-icon'),
            addTaskBtn: document.getElementsByClassName('add-task'),
            selectTasks: document.getElementsByClassName('select-all-global'),
            deselectTasks: document.getElementsByClassName('deselect-all-global'),
            fixedLogo: document.getElementsByClassName('fixed-logo')[0],
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
        taskElementController.moveTaskToDaily(key);
    }

    static moveToTaskList() {
        Router.addHash("task-list");
        counterOfTasks = 0;
        let taskBinder = new Binder('app/components/taskList/task-list.html', document.body);
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

    static subscribeCommonTaskListEvents() {
        let commonElements = TaskList.getTaskListElements;
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
                let scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled > 50) {
                    commonElements.fixedLogo.style.display = 'block';
                }
            }
        };
    }
}


