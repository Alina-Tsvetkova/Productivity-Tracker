class TaskNotification {
    wrapNotificationFunctionality(stateNotification) {
        let obj = this;
        setTimeout(function () {
            obj.addNotification(stateNotification);
        }, 200);

        setTimeout(function () {
            obj.removeNotification(stateNotification);
        }, 3000)
    }

    addNotification(stateNotification) {
        try {
            let taskNotification = new Binder('app/components/taskList/notifications/bottom-notifications.html');
            let receiveNotification = taskNotification.downloadComponent();
            wrapper.appendChild(receiveNotification.querySelector(stateNotification));
            setTimeout(function () {
                document.querySelector(stateNotification).style.marginTop = '10px';
            }, 100);
        }
        catch (e) {
            throw new Error("notification was already added");
        }
    }

    removeNotification(stateNotification) {
        setTimeout(function () {
            try {
                document.querySelector(stateNotification).style.marginTop = '-70px';
            }
            catch (e) {
                return false;
            }
        }, 1000);
        setTimeout(function () {
            try {
                document.querySelector(stateNotification).remove();
            }
            catch (e) {
                return false;
            }
        }, 2500)
    }
}
