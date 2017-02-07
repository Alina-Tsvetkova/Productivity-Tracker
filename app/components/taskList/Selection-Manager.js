class SelectionManager {
    static selectAll(elements) {
        let taskListElements = TaskList.getTaskListElements;
        let taskHashes = document.querySelectorAll(elements);
        SelectionManager.pushHashesToDeleteSet(taskHashes);
        let selectedSize = selectedTaskHashes.size;
        let quantityOfSelectedTasks = +taskListElements.quantityOfSelectedTasks[1].innerHTML;
        quantityOfSelectedTasks = selectedSize;
        for (let l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
            taskListElements.quantityOfSelectedTasks[l].style.display = 'block';
            taskListElements.quantityOfSelectedTasks[l].innerHTML = quantityOfSelectedTasks;
        }
        taskDeletorObj.pushTaskToDelete();
        TaskNotification.createNotification('.message-warn');
    }

    static pushHashesToDeleteSet(taskHashes) {
        for (let k = 0; k < taskHashes.length; k++) {
            selectedTaskHashes.add(taskHashes[k].getAttribute('taskkey'));
            SelectionManager.changeSelectedTaskImage(taskHashes[k].getElementsByClassName('indicator')[0]);
        }
    }

    static changeSelectedTaskImage(task) {
        classManager.removeClass(task,'canceled-delete');
        task.classList.add('for-delete-bg');
    }

    static changeDeselectedTaskImage(task) {
        classManager.removeClass(task,'for-delete-bg');
        classManager.removeClass(task,'for-delete');
        task.classList.add('canceled-delete');
    }

    static deselectAllSelectedTasks(elements) {
        let taskListElements = TaskList.getTaskListElements;
        let taskHashes = document.querySelectorAll(elements);
        SelectionManager.removeHashesToDeselect(taskHashes);
        let selectedSize = selectedTaskHashes.size;
        let quantityOfSelectedTasks = +taskListElements.quantityOfSelectedTasks[1].innerHTML;
        quantityOfSelectedTasks = selectedSize;
        for (let l = 0; l < taskListElements.quantityOfSelectedTasks.length; l++) {
            if (taskListElements.quantityOfSelectedTasks[l].innerHTML == 0) {
                return;
            }
            taskListElements.quantityOfSelectedTasks[l].innerHTML = quantityOfSelectedTasks;
        }
    }

    static removeHashesToDeselect(taskHashes) {
        for (let k = 0; k < taskHashes.length; k++) {
            selectedTaskHashes.delete(taskHashes[k].getAttribute('taskkey'));
            SelectionManager.changeDeselectedTaskImage(taskHashes[k].getElementsByClassName('indicator')[0]);
        }
    }
}