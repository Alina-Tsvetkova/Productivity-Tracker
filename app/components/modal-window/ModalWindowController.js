class ModalWindowController {

    initModalWindow() { // start module of Modal Window
        modalWindowModel.downloadEarlierCategories();
        modalWindowView.addTaskModal();
    }

    initEditModalWindow(index) { // start module of Modal Edit Window
        modalWindowView.showEditModal(index);
    }

    get getModalWindowElements() {
        return {
            task: document.querySelectorAll('.task'),
            titleInput: document.getElementsByClassName('title-input')[0],
            descriptionInput: document.getElementsByClassName('description-input')[0],
            categoryRadioBtn: document.querySelector('input.category-input:checked + label + label'),
            deadlineInput: document.getElementsByClassName('deadline-input')[0],
            estimationCheckboxes: document.querySelectorAll('input[type="checkbox"]:checked').length,
            priorityRadioBtn: document.querySelector('input[name="priority-level"]:checked + label + label'),
            categoryTitles: document.querySelectorAll('.categories-names .category-input'),
            categoryLabels: document.querySelectorAll('.categories-names .category-title'),
            categoriesInputs: document.querySelectorAll('input[name=category-name]'),
            priorityInputs: document.querySelectorAll('input[name=priority-level]')
        }
    }

    transitCategories(data, k) {
        if (!(data)) {
            return false;
        }

        modalWindowView.renderEarlierSavedCategories(data, k);
    }

    closeModalWindow(child) {
        modalWindowController.moveModalWindow(-50);
        setTimeout(function () {
            document.body.removeChild(child);
        }, 500)

    }

    moveModalWindow(coord) {
        setTimeout(function () {
            document.getElementsByClassName('add-task-modal')[0].style.top = coord + '%';
        }, 100)

        return coord;
    }

    subscribeModalEvents() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
            modalWindowController.closeModalWindow(document.getElementById('modal-window-elem-edit'));
        });

        ElementsListener.listenToEvents('click', document.getElementsByClassName('check-button-edit'), function () {
            productivityManager.saveEditedTask(index)
        });
    }

    subscribeAddTaskEvents() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('icon-add-task'), productivityManager.submitTask);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-button'), function () {
            modalWindowController.closeModalWindow(document.getElementById('modal-window-elem'));
        });
    }

    subscribeRemoveTaskModalEvents(modalElements) {
        ElementsListener.listenToEvents('click', modalElements.removeBtn, taskDeletorObj.submitDeleteTask);
        ElementsListener.listenToEvents('click', modalElements.cancelBtn, taskDeletorObj.cancelDeletion);
    }
}

let modalWindowController = new ModalWindowController();