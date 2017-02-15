class ModalWindowView {

    addTaskModal() {
        let modalBinder = new Binder('app/components/modal-window/modal-window.html');
        let receivedDoc = modalBinder.downloadComponent();
        document.body.appendChild(receivedDoc.getElementById('modal-window-elem'));
        modalWindowController.subscribeAddTaskEvents();
        modalWindowController.moveModalWindow(50);
        modalWindowView.attachDatePicker();
    }

    showEditModal(index) {
        let modalBinder = new Binder('app/components/modal-window/edit-modal-window.html');
        let receivedDoc = modalBinder.downloadComponent();
        document.body.appendChild(receivedDoc.getElementById('modal-window-elem-edit'));
        modalWindowView.fillEditModal(index);
    }

    downloadRemoveModalWindow() {
        let modalBinder = new Binder('app/components/modal-window/remove-modal-window.html');
        let receivedDoc = modalBinder.downloadComponent();
        document.body.appendChild(receivedDoc.getElementById('modal-w-remove'));
        modalWindowController.moveModalWindow(50);
    }

    fillEditModal(index) {
        let modalWindow = modalWindowController.getModalWindowElements;
        let taskContainer = modalWindow.task[index];
        modalWindow.titleInput.value = taskContainer.getElementsByClassName('task-title')[0].innerHTML;
        modalWindow.descriptionInput.value = taskContainer.getElementsByClassName('description-content')[0].innerHTML;

        let modalCheckboxes = document.querySelectorAll('#modal-window-elem-edit input[type=checkbox]');
        let priorityIndicator = document.querySelectorAll('.priority-indicator span')[index].innerHTML;
        for (let j = 0; j < priorityIndicator; j++) {
            modalCheckboxes[j].checked = true;
        }
        let taskPriority = $('.priority-indicator')[index];
        let choosedRadioPriority = modalWindowView.findChoosedPriority(taskPriority);
        let choosedRadioCategory = modalWindowView.findChoosedCategory(taskContainer);

        modalWindow.categoriesInputs[choosedRadioCategory].checked = true;
        modalWindow.priorityInputs[choosedRadioPriority].checked = true;

        modalWindowController.subscribeModalEvents();
        modalWindowController.moveModalWindow(50);
        modalWindowView.attachDatePicker();
    };

    findChoosedCategory(taskContainer) {
        let choosedRadioCategory = taskContainer.getAttribute('category');
        let allCategoriesNames = $('.categories li label.category-name');
        let allCategoriesNamesArr = Array.prototype.slice.call(allCategoriesNames);
        for (let k = 0; k < allCategoriesNamesArr.length; k++) {
            if (allCategoriesNamesArr[k].innerHTML == taskContainer.parentNode.getAttribute('category')) {
                choosedRadioCategory = allCategoriesNamesArr.indexOf(allCategoriesNamesArr[k]);
            }
            else if (choosedRadioCategory == null) {
                choosedRadioCategory = 0;
            }
        }
        return choosedRadioCategory;
    }

    findChoosedPriority(taskPriority) {
        let allPriorityLevels = $('.priorities li label.priority-name');
        let choosedRadioPriority;
        let allPriorityLevelsArr = Array.prototype.slice.call(allPriorityLevels);
        for (let k = 0; k < allPriorityLevelsArr.length; k++) {
            if (allPriorityLevelsArr[k].innerHTML.toLowerCase() == taskPriority.classList[1]) {
                choosedRadioPriority = allPriorityLevelsArr.indexOf(allPriorityLevelsArr[k]);
            }
        }
        return choosedRadioPriority;
    }

    renderEarlierSavedCategories(data, k) {
        let modalWindow = modalWindowController.getModalWindowElements;
        modalWindow.categoryTitles[k].value = data;
        modalWindow.categoryLabels[k].innerHTML = modalWindow.categoryTitles[k].value;
    }

    attachDatePicker() {
        $(function () {
            $("#datepicker").datepicker({
                dateFormat: 'dd.mm.yy'
            });
        });
        return true;
    };
}

let modalWindowView = new ModalWindowView();