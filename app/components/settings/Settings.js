class Settings {
    static downloadSettings() {
        Router.addHash("settings-cycle");
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-cycle-btn'), function () {
            let savedCycle = new CycleModel();
            savedCycle.saveUserCycle(UserData.getUserDataLocally());
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('next-btn'), function () {
            counterOfTasks = 0;
            TaskListTransfer.moveToTaskList();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('settings-switcher'), Settings.downloadSettings);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('pomodoros-var'), Settings.downloadSettings);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-btn-categories'), function () {
            let savedCategories = new Categories();
            savedCategories.saveCategories(UserData.getUserDataLocally());
        });
        DOMElementsInitializer = {
            settingsVariants: document.getElementsByClassName('settings-variants')[0],
            increaseButtons: document.getElementsByClassName('increment'),
            decreaseButtons: document.getElementsByClassName('dicrement'),
            cycle: document.getElementsByClassName('cycle-info')[0],
            counters: document.getElementsByClassName('field'),
            countersArr: Array.prototype.slice.call(document.getElementsByClassName('field')),
            buttonsArr: Array.prototype.slice.call(document.getElementsByClassName('increment')).concat(Array.prototype.slice.call(document.getElementsByClassName('dicrement'))),
            timePoints: document.getElementsByClassName('time-points')[0]
        };
        CategoriesView.renderEarlierSavedCategories();

        Binder.downloadPlugins();

        myCycle.renderSavedCycleSettings();
        Router.iconLinksBinder();
    }
}
