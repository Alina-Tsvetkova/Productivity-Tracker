class Icons {
    static get iconsObj() {
        return {
            settingsIcon: document.getElementsByClassName('settings-switcher'),
            taskListIcon: document.getElementsByClassName('tasks-list-icon'),
            logOutIcon: document.getElementsByClassName('log-out'),
            reportsIcon: document.getElementsByClassName('reports-switcher'),
            prevBtn: document.getElementsByClassName('prev-btn'),
            nextBtn: document.getElementsByClassName('next-arrow')
        }
    }

    static iconLinksBinder() {
        let isieEdge = (navigator.appName == "Netscape") && (navigator.appVersion.indexOf('Trident') === -1); // IE Edge

        let icons = Icons.iconsObj;
        ElementsListener.listenToEvents('click', icons.settingsIcon, function () {
            Router.addHash("settings-cycle");
            if (isieEdge) {
                Settings.downloadSettings();
            }
        });
        ElementsListener.listenToEvents('click', icons.taskListIcon, function () {
            Router.addHash("task-list");
            if (isieEdge) {
                TaskList.moveToTaskList();
            }
        });
        ElementsListener.listenToEvents('click', icons.logOutIcon, function () {
            logOutView.downloadLogOut();
        });
        ElementsListener.listenToEvents('click', icons.reportsIcon, function () {
            Router.addHash("reports");
            if (isieEdge) {
                Reports.downloadReports();
            }
        });
        ElementsListener.listenToEvents('click', icons.prevBtn, function () {
            Router.addHash("task-list");
            if (isieEdge) {
                TaskList.moveToTaskList();
            }
        });
        ElementsListener.listenToEvents('click', icons.nextBtn, function () {
            Router.addHash("reports");
            if (isieEdge) {
                Reports.downloadReports();
            }
        });
    }

    static downloadMainIcons() {
        let iconsBinder = new Binder('app/components/icons/icons.html');
        let iconsDoc = iconsBinder.downloadComponent();
        document.getElementsByClassName('icons')[0].appendChild(iconsDoc.getElementsByClassName('main-icons')[0]);
    }
}