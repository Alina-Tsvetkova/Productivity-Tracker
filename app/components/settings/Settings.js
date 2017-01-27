class Settings {
    static downloadSettings() {
        //ElementsListener.listenToEvents('click', document.getElementsByClassName('reports-switcher'), Reports.downloadReports);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('next-btn'), TaskListTransfer.moveToTaskList);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('settings-switcher'), Settings.downloadSettings);
        //ElementsListener.listenToEvents('click', document.getElementsByClassName('categories-var'), Settings.switchCategories);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('pomodoros-var'), Settings.downloadSettings);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-btn'), Categories.saveCategories);
        DOMElementsInitializer = {
            settingsVariants: document.getElementsByClassName('settings-variants')[0],
            increaseButtons: document.getElementsByClassName('increment'),
            decreaseButtons: document.getElementsByClassName('dicrement'),
            cycle: document.getElementsByClassName('cycle-info')[0],
            counters: document.getElementsByClassName('field'),
            countersArr: Array.prototype.slice.call(document.getElementsByClassName('field')),
            buttonsArr: Array.prototype.slice.call(document.getElementsByClassName('increment')).concat(Array.prototype.slice.call(document.getElementsByClassName('dicrement'))),
            timePoints: document.getElementsByClassName('time-points')[0]
        }
        $(document).ready(function () {
            let tabs = $("#tabs");
            tabs.tabSwitcher();
            Categories.renderEarlierSavedCtegories();

            let tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
        });
        myCycle.getDataForCycle();
    }
}






