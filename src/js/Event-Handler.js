let index;
class EventHandler {
    addAdditionalEvents(event) {
        let target = event.target.parentNode;
        if (target.classList.contains('increment') || target.classList.contains('dicrement')) {
            myCycle.changeCycleData(target);
        }

        if (event.target.classList.contains('edit')) {
            let allRenderedEditButtons = document.querySelectorAll('.edit');
            let allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
            index = allRenderedEditButtonsArr.indexOf(event.target);
            let key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
            modalWindowObj.showEditModal(index, key);
        }
        if (event.target.parentNode.classList.contains('check-button-edit')) {
            productivityManager.saveEditedTask(index);
        }

        if (event.target.parentNode.classList.contains('remove-btn-icon') || event.target.classList.contains('quantity-del-tasks')) {
            if (document.querySelector('.quantity-del-tasks').innerHTML > 0) {
                let deleteTaskModal = $('#modal-w-remove');
                ElementsListener.listenToEvents('click', document.getElementsByClassName('remove-btn'), taskDeletorObj.submitDeleteTask);
                ElementsListener.listenToEvents('click', document.getElementsByClassName('cancel-btn'), taskDeletorObj.cancelDeletion);
                $('.remove-btn-icon').click(function () {
                    if (document.querySelector('.quantity-del-tasks').innerHTML > 0) {
                        deleteTaskModal.dialogSwitcher('show');
                    }
                })
            }
            taskDeletorObj.givePossibilityToDelete();
        }
    }
}

let commonEventHandler = new EventHandler();

document.onclick = function (event) {
    commonEventHandler.addAdditionalEvents(event);
};

