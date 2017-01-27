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
        if (event.target.parentNode.classList.contains('check_button_edit')) {
            let editTaskModal = $('#modal_window_elem_edit');
            productivityManager.saveEditedTask(index);
        }

        if (event.target.parentNode.classList.contains('remove_btn_icon') || event.target.classList.contains('quantity_del_tasks')) {
            if (document.querySelector('.quantity_del_tasks').innerHTML > 0) {
                let deleteTaskModal = $('#modal_w_remove');
                ElementsListener.listenToEvents('click', document.getElementsByClassName('remove_btn'), productivityManager.submitDeleteTask);
                ElementsListener.listenToEvents('click', document.getElementsByClassName('cancel_btn'), productivityObj.cancelDeletion);
                $('.remove_btn_icon').click(function () {
                    if (document.querySelector('.quantity_del_tasks').innerHTML > 0) {
                        deleteTaskModal.dialogSwitcher('show');
                    }
                })
            }
            productivityObj.givePossibilityToDelete();
        }

        if (event.target.parentNode.classList.contains('log_out')) {
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

