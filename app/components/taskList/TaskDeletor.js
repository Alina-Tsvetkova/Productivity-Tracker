let selectedTaskHashes = new Set();
class TaskDeletor  {

    get deleteTaskObj() {
        return {
            indicator: document.getElementsByClassName('indicator'),
            removeBtn: document.getElementsByClassName('remove-btn'),
            cancelBtn: document.getElementsByClassName('cancel-btn')
        }
    }

    cancelDeletion() {
        selectedTaskHashes.clear();
        taskDeletorObj.removeIndicatorOfQuantityDel();
        let deleteElements = taskDeletorObj.deleteTaskObj;
        modalWindowController.closeModalWindow(document.getElementById('modal-w-remove'));
        for (let j = 0; j < deleteElements.indicator.length; j++) {
            deleteElements.indicator[j].classList.remove('for-delete', 'for-delete-bg');
            deleteElements.indicator[j].classList.add('canceled-delete');
        }
        TaskNotification.createNotification('.message-info');
    }

    givePossibilityToDelete() {
        let taskListElements = TaskList.getTaskListElements;
        let deleteElements = taskDeletorObj.deleteTaskObj;
        for (let l = 0; l < deleteElements.indicator.length; l++) {
            deleteElements.indicator[l].classList.remove('canceled-delete');
            deleteElements.indicator[l].classList.add('for-delete');
        }
        for (let h = 0; h < taskListElements.quantityOfSelectedTasks.length; h++) {
            if (taskListElements.quantityOfSelectedTasks[h].innerHTML === '') {
                taskListElements.quantityOfSelectedTasks[h].style.display = 'block';
                taskListElements.quantityOfSelectedTasks[h].innerHTML = 0;
            }
        }
    }

    pushTaskToDelete() {
        let taskListElements = TaskList.getTaskListElements;
        if (event.target.classList.contains('indicator')) {
            event.target.classList.add('for-delete-bg');
            selectedTaskHashes.add(event.target.parentNode.parentNode.getAttribute('taskKey'));
            let quantityOfSelectedTasks = selectedTaskHashes.size;
            for (let l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
                taskListElements.quantityOfSelectedTasks[l].style.display = 'block';
                taskListElements.quantityOfSelectedTasks[l].innerHTML = quantityOfSelectedTasks;
            }
        }
    }

    submitDeleteTask() {
        for (let selectedTaskHash of selectedTaskHashes) {
            firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + selectedTaskHash).remove();
        }
        modalWindowController.closeModalWindow(document.getElementById('modal-w-remove'));
        taskDeletorObj.removeIndicatorOfQuantityDel();
        selectedTaskHashes.clear();
        taskElementController.checkIfTaskListEmpty();
        TaskNotification.createNotification('.message-delete');
    }



    checkIfToDeleteTasks() {
        let modalElements = taskDeletorObj.deleteTaskObj;
        if (document.querySelector('.quantity-del-tasks').innerHTML > 0) {
            modalWindowView.downloadRemoveModalWindow();
            modalWindowController.subscribeRemoveTaskModalEvents(modalElements);
        }
        taskDeletorObj.givePossibilityToDelete();
    }


    removeIndicatorOfQuantityDel() {
        let taskListElements = TaskList.getTaskListElements;
        for (let j = 0; j < taskListElements.quantityOfSelectedTasks.length; j++) {
            taskListElements.quantityOfSelectedTasks[j].innerHTML = 0;
            taskListElements.quantityOfSelectedTasks[j].style.display = 'none';
        }
    }
}


let taskDeletorObj = new TaskDeletor();