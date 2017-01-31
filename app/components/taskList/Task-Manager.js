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

        let allCategoriesNames = document.getElementsByClassName('category-input');
        let allCategoriesValues = [];
        for (let j = 0; j < allCategoriesNames.length; j++) {
            allCategoriesValues.push(allCategoriesNames[j].value);
        }
        let foundCategory = allCategoriesValues.indexOf(postData.category);
        postData.color_indicator = foundCategory;

        // let dateArray = (postData.deadline).split(' ');
        // let k = 0;
        // dateArray.forEach(function (item) {
        //     dateArray[k] = item.replace(',', '');
        //     k++;
        // });
        //
        // let monthDeadline, dayDeadline, yearDeadline;
        //
        // let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // for (let k = 0; k < allMonths.length; k++) {
        //     if (dateArray.indexOf(allMonths[k]) == 1) {
        //         monthDeadline = k + 1;
        //     }
        // }
        //
        // let yearRegExp = /[0-9]{4}/;
        // let dayRegExp = /[0-9]{1,2}/;
        // for (let k = 0; k < dateArray.length; k++) {
        //     if (dateArray[k].match(yearRegExp)) {
        //         yearDeadline = dateArray[k];
        //     }
        //     else if (dateArray[k].match(dayRegExp)) {
        //         dayDeadline = dateArray[k];
        //     }
        // }
        //
        // postData.deadline = dayDeadline + '.' + monthDeadline + '.' + yearDeadline;

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