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

        let dateArray = (postData.deadline).split(' ');
        let k = 0;
        dateArray.forEach(function (item) {
            dateArray[k] = item.replace(',', '');
            k++;
        });

        let monthDeadline, dayDeadline, yearDeadline;

        let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (let k = 0; k < allMonths.length; k++) {
            if (dateArray.indexOf(allMonths[k]) == 1) {
                monthDeadline = k + 1;
            }
        }

        let yearRegExp = /[0-9]{4}/;
        let dayRegExp = /[0-9]{1,2}/;
        for (let k = 0; k < dateArray.length; k++) {
            if (dateArray[k].match(yearRegExp)) {
                yearDeadline = dateArray[k];
            }
            else if (dateArray[k].match(dayRegExp)) {
                dayDeadline = dateArray[k];
            }
        }

        postData.deadline = dayDeadline + '.' + monthDeadline + '.' + yearDeadline;

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

    moveTaskToDailyGroup(i) {
        // if (document.getElementsByClassName('task')[i].getAttribute('dailyTask') == 'true') {
        //     console.log(document.getElementById('daily-tasks'));
        //     document.querySelectorAll('.categorized-ul')[i].getElementsByClassName('move-task')[0].style.display = 'none';
        //     document.querySelectorAll('.categorized-ul')[i].getElementsByClassName('edit')[0].style.marginTop = '15px';
        //     document.getElementById('daily-tasks').appendChild(document.getElementsByClassName('categorized-ul')[i]);
        // }
    }

    moveTaskToDaily() {
        // console.log('daily');
        // if (document.querySelectorAll('#daily-tasks .task ').length >= 5) {
        //     let newNotification = new TaskNotification();
        //     newNotification.wrapNotificationFunctionality('.message-error');
        //     return false;
        // }
        // else {
        //     let updates = {
        //         dailyTask: true
        //     };
        //     let allMoveButtons = Array.prototype.slice.call($('#globalTasks .move-task'));
        //     let index = allMoveButtons.indexOf(event.target);
        //     let allTasksToDo = $('#globalTasks .task');
        //     let globalUls = $('#globalTasks .categorized-ul');
        //
        //     moveableTask = allTasksToDo[index].getAttribute('taskKey');
        //
        //     firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + moveableTask).update(updates);
        //
        //     $('.added-task')[0].classList.add('non-visible-elem');
        //     document.querySelectorAll('#globalTasks .task')[index].setAttribute('dailyTask', 'true');
        //
        //     globalUls[index].getElementsByClassName('move-task')[0].classList.add('non-visible-elem');
        //     globalUls[index].getElementsByClassName('edit')[0].style.marginTop = '15px';
        //     $('#daily-tasks').append(globalUls[index]);
        // }
    }
}

let productivityManager = new TaskManager();