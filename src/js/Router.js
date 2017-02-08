class Router {

    static listenToHashChanges() {
        $(window).on('popstate', function (e) {
            if (window.location.hash == "#reports") {
                Reports.downloadReports();
            }
            else if (window.location.hash == "#settings-cycle") {
                let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
                settingsBinder.downloadComponent();
                Settings.downloadSettings();
            }
        });
    }

    static addHash(hash) {
        window.location.hash = hash;
    }

    static iconLinksBinder() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('settings-switcher'), function () {
            let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            Settings.downloadSettings();
            Router.listenToHashChanges();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('tasks-list-icon'), function () {
            counterOfTasks = 0;
            TaskList.moveToTaskList();
            Router.listenToHashChanges();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('log-out'), function () {
            loggedUser.logOutWrapper();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), function () {
            Reports.downloadReports();
            Router.listenToHashChanges();
        });
    }
}


Router.listenToHashChanges();