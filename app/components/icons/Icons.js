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
        let icons = Icons.iconsObj;
        ElementsListener.listenToEvents('click', icons.settingsIcon, function () {
            Router.addHash("settings-cycle");
        });
        ElementsListener.listenToEvents('click', icons.taskListIcon, function () {
            Router.addHash("task-list");
        });
        ElementsListener.listenToEvents('click', icons.logOutIcon, function () {
            loggedUser.logOutWrapper();
        });
        ElementsListener.listenToEvents('click', icons.reportsIcon, function () {
            Router.addHash("reports");
        });
        ElementsListener.listenToEvents('click', icons.prevBtn, function () {
            Router.addHash("task-list");
        });
        ElementsListener.listenToEvents('click', icons.nextBtn, function () {
            Router.addHash("reports");
        });
    }
}