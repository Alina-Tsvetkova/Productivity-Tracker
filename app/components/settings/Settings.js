class Settings {
    static downloadSettings() {
        //ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), Reports.downloadReports);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-cycle-btn'), function () {
            let savedCycle = new CycleModel();
            savedCycle.saveUserCycle(localStorage.getItem('currentUser'));
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('next-btn'), TaskListTransfer.moveToTaskList);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('settings-switcher'), Settings.downloadSettings);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('pomodoros-var'), Settings.downloadSettings);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('log-out'), function () {
            let loggedUser = new LogOut();
            loggedUser.logOutUser();
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-btn-categories'), function () {
            let savedCategories = new Categories();
            savedCategories.saveCategories(localStorage.getItem('currentUser'));
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
        $(document).ready(function () {
            let tabs = $("#tabs");
            tabs.tabSwitcher();
            CategoriesView.renderEarlierSavedCategories();

            let tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
        });
        myCycle.renderSavedCycleSettings();

    }
}






