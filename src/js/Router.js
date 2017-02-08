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
            else if (window.location.hash == "#task-list") {
                counterOfTasks = 0;
                TaskList.moveToTaskList();
                Router.listenToHashChanges();
            }
        });
    }

    static addHash(hash) {
        window.location.hash = hash;
    }

    static iconLinksBinder() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('settings-switcher'), function () {
            Router.addHash("settings-cycle");
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('tasks-list-icon'), function () {
            Router.addHash("task-list");
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('log-out'), function () {
            loggedUser.logOutWrapper();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), function () {
            Router.addHash("reports");
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('prev-btn'), function () {
            Router.addHash("task-list");
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('next-arrow'), function () {
            Router.addHash("reports");
        });
    }
}


Router.listenToHashChanges();