class TaskManager {
    submitTask() {
        taskListInitiator.initModalWindowElements();
        let postData = {
            title: modalWindowElements.titleInput.value,
            description: modalWindowElements.descriptionInput.value,
            category: modalWindowElements.categoryRadioBtn.innerHTML,
            deadline: modalWindowElements.deadlineInput.value,
            estimation: modalWindowElements.estimationCheckboxes,
            priority: modalWindowElements.priorityRadioBtn.innerHTML,
            color_indicator: null,
            taskisdone: 'false',
            dailyTask: false

        };
        if (postData.deadline == '') {
            let today = new Date().getDate() + '.' + new Date().getMonth()+1 + '.' + new Date().getFullYear();
            postData.deadline = today;
        }

        let allCategoriesNames = document.getElementsByClassName('category-input');
        let allCategoriesValues = [];
        for (let j = 0; j < allCategoriesNames.length; j++) {
            allCategoriesValues.push(allCategoriesNames[j].value);
        }
        let foundCategory = allCategoriesValues.indexOf(postData.category);
        postData.color_indicator = foundCategory;

        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks').push(postData);
        counterOfTasks = 0;

        tasksRenderer.ifTaskPresent();
        if (document.getElementById('modal-window-elem')) {
            document.body.removeChild(document.getElementById('modal-window-elem'));
        }
        taskListElements.globalListBtn.style.display = 'block';
        funcTask.groupTasksByCategory();
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-success');
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
        let foundCategory = allCategoriesValues.indexOf(updates.category);
        updates.color_indicator = foundCategory;
        let editedHash = document.getElementsByClassName('task')[index].getAttribute('taskKey');

        counterOfTasks = 0;

        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + editedHash).update(updates);
        tasksRenderer.ifTaskPresent();
        ModalWindow.closeModalWindow(document.getElementById('modal-window-elem-edit'));
    }

}

let productivityManager = new TaskManager();