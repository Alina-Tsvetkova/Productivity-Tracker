class TaskNotification {
    wrapNotificationFunctionality(stateNotification) {
        let obj = this;
        setTimeout(function () {
            obj.addNotification(stateNotification);
        }, 200)

        setTimeout(function () {
            obj.removeNotification(stateNotification);
        }, 3000)
    }

    addNotification(stateNotification) {
        let taskNotification = new Binder('app/components/taskList/notifications/bottom-notifications.html');
        let receiveNotification = taskNotification.downloadComponent();
        wrapper.appendChild(receiveNotification.querySelector(stateNotification));
        setTimeout(function () {
            document.querySelector(stateNotification).style.marginTop = '10px';
        }, 100);
    }

    removeNotification(stateNotification) {
        setTimeout(function () {
            document.querySelector(stateNotification).style.marginTop = '-70px';
        }, 1000);
        setTimeout(function () {
            document.querySelector(stateNotification).remove();
        }, 2500)
    }
}
