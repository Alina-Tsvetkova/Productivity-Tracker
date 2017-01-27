class TaskManager {
    submitTask() {
        taskListInitiator.initModalWindowElements();
        var postData = {
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
        for (var j = 0; j < allCategoriesNames.length; j++) {
            allCategoriesValues.push(allCategoriesNames[j].value);
        }
        let foundCategory = allCategoriesValues.indexOf(postData.category);
        postData.color_indicator = foundCategory;

        let dateArray = (postData.deadline).split(' ');
        let k = 0;
        dateArray.forEach(function (item) {
            dateArray[k] = item.replace(',', '');
            k++;
        })


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
        allTasksToDo.push(postData);
        counterOfTasks = 0;
        productivityObj.ifTaskPresent();
        if (document.getElementById('modal_window_elem')) {
            document.body.removeChild(document.getElementById('modal_window_elem'));
        }
        taskListElements.globalListBtn.style.display = 'block';
        document.getElementsByClassName('opportunity_select')[0].style.display = 'block';
        document.getElementsByClassName('opportunity_select')[1].style.display = 'block';
        document.getElementsByClassName('priority_list')[0].style.display = 'block';
        document.getElementsByClassName('toggle_doneable')[0].style.display = 'block';
        funcTask.groupTasksByCategory();
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality('.message-success');
    }

    saveEditedTask(index) {
        var updates = {};
        updates.title = document.querySelectorAll('.title_input')[0].value;
        updates.description = document.querySelectorAll('.description_input')[0].value;
        updates.category = document.querySelector('input.category-input:checked + label + label').innerHTML;
        updates.priority = document.querySelector('input[name="priority_level"]:checked + label + label').innerHTML;
        updates.deadline = document.querySelectorAll('.deadline_input')[0].value;
        let editedHash = document.getElementsByClassName('task')[index].getAttribute('taskKey');
        console.log(document.getElementsByClassName('task')[index].getAttribute('taskKey'));
        tasks.ref('tasksToDo/' + editedHash).update(updates);
        document.getElementById('global-tasks').innerHTML = '';
        document.getElementById('daily-tasks').innerHTML = '';
        counterOfTasks = 0;
        allTasksToDo.on('child_added', function (data) {
            productivityObj.createTaskField(data);
        });
        ModalWindow.closeModalWindow(document.getElementById('modal_window_elem_edit'));
    }

    submitDeleteTask() {
        for (let selectedTaskHash of selectedTaskHashes) {
            tasks.ref('tasksToDo/' + selectedTaskHash).remove();
        }
        let deleteTaskModal = $('#modal_w_remove');
        deleteTaskModal.dialogSwitcher('close');
        productivityObj.removeIndicatorOfQuantityDel();
        counterOfTasks = 0;
        productivityObj.ifTaskPresent();
        if (document.getElementsByClassName('task').length == 0) {
            document.getElementsByClassName('add_task_sect')[0].style.display = 'block';
        }
        selectedTaskHashes.clear();
    }
}

