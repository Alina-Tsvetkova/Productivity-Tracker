let index;
class EventHandler {
    addAdditionalEvents(event) {
        if (event.target.classList.contains('edit')) {
            let allRenderedEditButtons = document.querySelectorAll('.edit');
            let allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
            allRenderedEditButtons = document.querySelectorAll('.edit');
            allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
            index = allRenderedEditButtonsArr.indexOf(event.target);
            let key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
            modalWindowObj.showEditModal(index, key);
        }

        if (event.target.classList.contains('move-task')) {
            let allRenderedEditButtons = document.querySelectorAll('.move-task');
            let allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
            allRenderedEditButtons = document.querySelectorAll('.move-task');
            allRenderedEditButtonsArr = Array.prototype.slice.call(allRenderedEditButtons);
            index = allRenderedEditButtonsArr.indexOf(event.target);
            let key = document.body.getElementsByClassName('task')[index].getAttribute("taskKey");
            dailyTask.moveTaskToDaily(index, key);
        }
    }
}

let commonEventHandler = new EventHandler();

document.onclick = function (event) {
    commonEventHandler.addAdditionalEvents(event);
};

