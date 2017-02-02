class TaskManager {
    submitTask() {
        let modalWindowElements = taskListInitiator.initModalWindowElements();
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
            dateOfFinish:null
        };

        (function addDefaultData() {
            if (postData.deadline == '') {
                let today = new Date().getDate() + '.' + parseInt(new Date().getMonth() + 1) + '.' + new Date().getFullYear();
                postData.deadline = today;
            }
        }());


        let allCategoriesNames = document.getElementsByClassName('category-input');
        let allCategoriesValues = [];
        for (let j = 0; j < allCategoriesNames.length; j++) {
            allCategoriesValues.push(allCategoriesNames[j].value);
        }
        let foundCategory = allCategoriesValues.indexOf(postData.category);

        postData.colorIndicator = foundCategory - 1;

        tasksRenderer.sendSubmittedData(postData);
        counterOfTasks = 0;

        tasksRenderer.checkIfTaskListEmpty();
        if (document.getElementById('modal-window-elem')) {
            document.body.removeChild(document.getElementById('modal-window-elem'));
        }

        funcTask.groupTasksByCategory();
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-success');
    }

    sendSubmittedData(postData) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').push(postData);
    }

    saveEditedTask(index) {
        let updates = {};
        updates.title = document.querySelectorAll('.title-input')[0].value;
        updates.description = document.querySelectorAll('.description-input')[0].value;
        updates.category = document.querySelector('input.category-input:checked + label + label').innerHTML;
        updates.priority = document.querySelector('input[name="priority-level"]:checked + label + label').innerHTML;
        updates.deadline = document.querySelectorAll('.deadline-input')[0].value;
        let allCategoriesNames = document.getElementsByClassName('category-input');
        let allCategoriesValues = [];
        for (let j = 0; j < allCategoriesNames.length; j++) {
            allCategoriesValues.push(allCategoriesNames[j].value);
        }
        updates.colorIndicator = allCategoriesValues.indexOf(updates.category);
        let editedHash = document.getElementsByClassName('task')[index].getAttribute('taskKey');
        counterOfTasks = 0;
        tasksRenderer.sendEditedData(updates, editedHash);
        tasksRenderer.checkIfTaskListEmpty();
        ModalWindow.closeModalWindow(document.getElementById('modal-window-elem-edit'));
    }

    sendEditedData(updates, editedHash) {
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + editedHash).update(updates);
    }

}

let productivityManager = new TaskManager();