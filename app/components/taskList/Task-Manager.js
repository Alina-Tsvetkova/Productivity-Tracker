class TaskManager {

    submitTask() {
        let modalWindowElements =  modalWindowController.getModalWindowElements;

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
            postData.deadline = productivityManager.addDefaultData();
        }

        productivityManager.sendSubmittedData(postData);
        if (document.getElementById('modal-window-elem')) {
            document.body.removeChild(document.getElementById('modal-window-elem'));
        }
        TaskNotification.createNotification('.message-success');
        taskElementController.checkIfALLTasksAreDone();
    }

    sendSubmittedData(postData) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').push(postData);
        taskElementController.checkIfTaskListEmpty();
    }

    saveEditedTask(index) {
        let updates = {};
        updates.title = document.querySelectorAll('.title-input')[0].value;
        updates.description = document.querySelectorAll('.description-input')[0].value;
        updates.category = document.querySelector('input.category-input:checked').value;
        updates.priority = document.querySelector('input[name="priority-level"]:checked + label + label').innerHTML;
        updates.deadline = document.querySelectorAll('.deadline-input')[0].value;
        updates.estimation = document.querySelectorAll('.tomato-estim:checked').length;

        if (document.querySelectorAll('.deadline-input')[0].value == '') {
            let editedToday = new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
            updates.deadline = editedToday;
        }

        let allCategoriesNames = document.getElementsByClassName('category-input');
        let allCategoriesValues = [];
        for (let j = 0; j < allCategoriesNames.length; j++) {
            allCategoriesValues.push(allCategoriesNames[j].value);
        }
        updates.colorIndicator = allCategoriesValues.indexOf(updates.category) - 1;
        let editedHash = document.getElementsByClassName('task')[index].getAttribute('taskKey');
        productivityManager.sendEditedData(updates, editedHash);
        modalWindowController.closeModalWindow(document.getElementById('modal-window-elem-edit'));
    }

    sendEditedData(updates, editedHash) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + editedHash).update(updates);
        taskElementController.checkIfTaskListEmpty();
    }

    addDefaultData() {
        return new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
    };
}

let productivityManager = new TaskManager();