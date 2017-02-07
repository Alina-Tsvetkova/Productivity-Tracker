class Router {
    static listenToHashChanges() {
        if (window.location.hash === '#settings-cycle') {


        }
    }

    static addHash(hash) {
        window.location.hash = hash;
    }

    static iconLinksBinder() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('settings-switcher'), function () {
            let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            Settings.downloadSettings();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('tasks-list-icon'), function () {
            counterOfTasks = 0;
            TaskList.moveToTaskList();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('log-out'), function () {
            loggedUser.logOutWrapper();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), Reports.downloadReports);
    }
}

Router.listenToHashChanges();

