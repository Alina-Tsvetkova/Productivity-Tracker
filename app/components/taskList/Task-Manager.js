class TaskManager {

    get editModalWindowElem() {
        return {
            titleField: document.getElementsByClassName('title-input')[0],
            descriptionField: document.getElementsByClassName('description-input')[0],
            checkedCategory: document.querySelector('input.category-input:checked'),
            checkedPriority: document.querySelector('input[name="priority-level"]:checked + label + label'),
            deadlineInput: document.getElementsByClassName('deadline-input')[0],
            checkedEstimation: document.querySelectorAll('.tomato-estim:checked'),
            allCategoriesNames: document.getElementsByClassName('category-input'),
        }
    }


    submitTask() {
        let modalWindowElements = modalWindowController.getModalWindowElements;
        let postData = {
            title: modalWindowElements.titleInput.value,
            description: modalWindowElements.descriptionInput.value,
            category: modalWindowElements.categoryRadioBtn.innerHTML,
            deadline: modalWindowElements.deadlineInput.value,
            estimation: modalWindowElements.estimationCheckboxes,
            priority: modalWindowElements.priorityRadioBtn.innerHTML,
            colorIndicator: null,
            taskIsDone: false,
            timerIsOn: false,
            startOfTimer: 0,
            timerIterations: 0,
            dateOfFinish: null,
            dailyTask: false
        };

        let allCategoriesNames = document.getElementsByClassName('category-input');
        let allCategoriesValues = [];
        for (let j = 0; j < allCategoriesNames.length; j++) {
            allCategoriesValues.push(allCategoriesNames[j].value);
        }
        let foundCategory = allCategoriesValues.indexOf(postData.category);

        postData.colorIndicator = foundCategory - 1;

        if (postData.deadline == '') {
            postData.deadline = taskElementController.addDefaultData();
        }

        taskElementModel.sendSubmittedData(postData);
        modalWindowController.closeModalWindow(document.getElementById('modal-window-elem'));

        TaskNotification.createNotification('.message-success');
        taskElementController.checkIfALLTasksAreDone();
    }


    saveEditedTask(index) {
        let editModalElements = productivityManager.editModalWindowElem;
        let updates = {};
        updates.title = editModalElements.titleField.value;
        updates.description = editModalElements.descriptionField.value;
        updates.category = editModalElements.checkedCategory.value;
        updates.priority = editModalElements.checkedPriority.innerHTML;
        updates.deadline = editModalElements.deadlineInput.value;
        updates.estimation = editModalElements.checkedEstimation.length;

        if (editModalElements.deadlineInput.value == '') {
            let editedToday = taskElementController.addDefaultData();
            updates.deadline = editedToday;
        }

        let allCategoriesValues = [];
        for (let j = 0; j < editModalElements.allCategoriesNames.length; j++) {
            allCategoriesValues.push(editModalElements.allCategoriesNames[j].value);
        }
        updates.colorIndicator = allCategoriesValues.indexOf(updates.category) - 1;
        let editedHash = document.getElementsByClassName('task')[index].getAttribute('taskKey');
        taskElementModel.sendEditedData(updates, editedHash);
        modalWindowController.closeModalWindow(document.getElementById('modal-window-elem-edit'));
    }
}

let productivityManager = new TaskManager();