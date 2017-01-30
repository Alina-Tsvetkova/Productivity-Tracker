let globalListIsOpened = true;
let index;
class EventHandler {
    addAdditionalEvents(event) {
        let target = event.target.parentNode;
        if (target.classList.contains('increment') || target.classList.contains('dicrement')) {
            myCycle.changeCycleData(target);
        }

        if (event.target.classList.contains('edit')) {
            allRenderedEditButtons = document.querySelectorAll('.edit');
            allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
            index = allRenderedEditButtonsArr.indexOf(event.target);
            let key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
            modalWindowObj.showEditModal(index, key);
        }
        if (event.target.parentNode.classList.contains('check-button-edit')) {
            let editTaskModal = $('#modal-window-elem-edit');
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

        if (event.target.parentNode.classList.contains('log-out')) {
            localStorage.isLoggedIn = false;
            let loginBinder = new Binder('login/login.html', document.body, 'loggedOut');
            loginBinder.downloadComponent();
        }
    }
}

let commonEventHandler = new EventHandler();

document.onclick = function (event) {
    commonEventHandler.addAdditionalEvents(event);
}

