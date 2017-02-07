let selectedTaskHashes = new Set();
class TaskDeletor extends TaskManager {
    cancelDeletion() {
        selectedTaskHashes.clear();
        taskDeletorObj.removeIndicatorOfQuantityDel();
        ModalWindow.closeModalWindow(document.getElementById('modal-w-remove'));
        for (let j = 0; j < document.getElementsByClassName('indicator').length; j++) {
            document.getElementsByClassName('indicator')[j].classList.remove('for-delete', 'for-delete-bg');
            document.getElementsByClassName('indicator')[j].classList.add('canceled-delete');
        }
        TaskNotification.createNotification('.message-info');
    }

    givePossibilityToDelete() {
        let taskListElements = TaskList.getTaskListElements;
        let allTrashViews = document.getElementsByClassName('indicator');
        for (let l = 0; l < allTrashViews.length; l++) {
            document.getElementsByClassName('indicator')[l].classList.remove('canceled-delete');
            allTrashViews[l].classList.add('for-delete');
        }
        for (let h = 0; h < taskListElements.quantityOfSelectedTasks.length; h++) {
            if (taskListElements.quantityOfSelectedTasks[h].innerHTML === '') {
                taskListElements.quantityOfSelectedTasks[h].style.display = 'block';
                taskListElements.quantityOfSelectedTasks[h].innerHTML = 0;
            }
        }
    }

    pushTaskToDelete() {
        console.log(selectedTaskHashes);
        let taskListElements = TaskList.getTaskListElements;
        if (event.target.classList.contains('indicator')) {
            let quantityOfSelectedTasks = +taskListElements.quantityOfSelectedTasks[1].innerHTML;
            event.target.classList.add('for-delete-bg');
            selectedTaskHashes.add(event.target.parentNode.parentNode.getAttribute('taskKey'));
            quantityOfSelectedTasks = selectedTaskHashes.size;
            for (let l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
                taskListElements.quantityOfSelectedTasks[l].style.display = 'block';
                taskListElements.quantityOfSelectedTasks[l].innerHTML = quantityOfSelectedTasks;
            }
        }
        TaskNotification.createNotification('.message-warn');
    }

    submitDeleteTask() {
        for (let selectedTaskHash of selectedTaskHashes) {
            firebase.database().ref('users/' + UserData.getUserDataLocally() + '/tasks/' + selectedTaskHash).remove();
        }
        let deleteTaskModal = $('#modal-w-remove');
        deleteTaskModal.dialogSwitcher('close');
        taskDeletorObj.removeIndicatorOfQuantityDel();
        selectedTaskHashes.clear();
        tasksRenderer.checkIfTaskListEmpty();
        TaskNotification.createNotification('.message-delete');
    }

    checkIfToDeleteTasks() {
        alert('delete them');
        if (document.querySelector('.quantity-del-tasks').innerHTML > 0) {
            let deleteTaskModal = $('#modal-w-remove');
            deleteTaskModal.dialogSwitcher('show');
            ElementsListener.listenToEvents('click', document.getElementsByClassName('remove-btn'), taskDeletorObj.submitDeleteTask);
            ElementsListener.listenToEvents('click', document.getElementsByClassName('cancel-btn'), taskDeletorObj.cancelDeletion);
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