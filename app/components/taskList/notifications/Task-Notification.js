class TaskNotification {

    static createNotification(params) {
        let newNotification = new TaskNotification();
        newNotification.wrapNotificationFunctionality(params);
        return newNotification;
    }

    wrapNotificationFunctionality(stateNotification) {
        if (document.getElementsByClassName('bottom-message').length > 0) {
            return false;
        }
        let obj = this;
        setTimeout(function () {
            obj.addNotification(stateNotification);
        }, 200);

        setTimeout(function () {
            obj.removeNotification(stateNotification);
        }, 2000)
    }

    addNotification(stateNotification) {
        try {
            let taskNotification = new Binder('app/components/taskList/notifications/bottom-notifications.html');
            let receiveNotification = taskNotification.downloadComponent();
            wrapper.appendChild(receiveNotification.querySelector(stateNotification));
            setTimeout(function () {
                document.querySelector(stateNotification).classList.remove('removable-notification');
                document.querySelector(stateNotification).classList.add('added-notification');
            }, 100);
        }
        catch (e) {
            throw new Error("notification was already added");
        }
    }

    removeNotification(stateNotification) {
        setTimeout(function () {
            try {
                document.querySelector(stateNotification).classList.remove('added-notification');
                document.querySelector(stateNotification).classList.add('removable-notification');
            }
            catch (e) {
                return false;
            }
        }, 500);
        setTimeout(function () {
            try {
                document.querySelector(stateNotification).remove();
            }
            catch (e) {
                return false;
            }
        }, 1500)
    }
}
