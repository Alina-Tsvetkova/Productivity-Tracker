class Settings {
    static downloadSettings() {
        Router.addHash("settings-cycle");
        let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
        settingsBinder.downloadComponent();
        DOMElementsInitializer = Settings.settingsObj;
        ElementsListener.listenToEvents('click', DOMElementsInitializer.saveCycleBtn, CycleModel.createCycle);
        ElementsListener.listenToEvents('click', DOMElementsInitializer.nextBtn, function () {
            counterOfTasks = 0;
            TaskList.moveToTaskList();
        });

        ElementsListener.listenToEvents('click', DOMElementsInitializer.increaseButtons, function (event) {
            let target = event.target.parentNode;
            if (navigator.userAgent == 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0') {
                target = event.target;
            }
            event.stopPropagation();
            myCycle.changeCycleData(target);
        });

        ElementsListener.listenToEvents('click', DOMElementsInitializer.decreaseButtons, function (event) {
            let target = event.target.parentNode;
            if (navigator.userAgent == 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0') {
                target = event.target;
            }
            event.stopPropagation();
            myCycle.changeCycleData(target);
        });

        ElementsListener.listenToEvents('click', DOMElementsInitializer.saveCategoriesBtn, Categories.createCategories);

        CategoriesView.renderEarlierSavedCategories();

        Binder.downloadPlugins();
        CycleModel.receiveCycleData();
        Icons.iconLinksBinder();
    }

    static get settingsObj() {
        return {
            settingsVariants: document.getElementsByClassName('settings-variants')[0],
            increaseButtons: document.getElementsByClassName('increment'),
            decreaseButtons: document.getElementsByClassName('dicrement'),
            cycle: document.getElementsByClassName('cycle-info')[0],
            counters: document.getElementsByClassName('field'),
            countersArr: Array.prototype.slice.call(document.getElementsByClassName('field')),
            buttonsArr: Array.prototype.slice.call(document.getElementsByClassName('increment')).concat(Array.prototype.slice.call(document.getElementsByClassName('dicrement'))),
            timePoints: document.getElementsByClassName('time-points')[0],
            saveCycleBtn: document.getElementsByClassName('save-cycle-btn')[0],
            nextBtn:document.getElementsByClassName('next-btn')[0],
            saveCategoriesBtn:document.getElementsByClassName('save-btn-categories')[0]
        }
    }

    static notifyAboutSuccessfulSave(event) {
        let modalBinder = new Binder('app/components/settings/save-form.html');
        let receivedDoc = modalBinder.downloadComponent();
        document.body.appendChild(receivedDoc.getElementById('save-form-wrapper'));
        settings.addSaveMessage(event);
        setTimeout(function () {
            document.getElementById('save-form-wrapper').classList.add('save-form-wrapper-appearance');
        }, 200);
        setTimeout(function () {
            Categories.removeNotificationSave();
        }, 2000);
    }

    addSaveMessage(event) {
        if (event.target.classList.contains('save-btn-categories')) {
            document.getElementsByClassName('save-form')[0].innerHTML = "Categories were successfully Saved!";
        }
        else {
            document.getElementsByClassName('save-form')[0].innerHTML = "Cycle was successfully Saved!";
        }
    }

    static removeNotificationSave() {
        $('#save-form-wrapper').fadeOut(1500);
        setTimeout(function () {
            document.body.removeChild(document.getElementById('save-form-wrapper'));
        }, 3000);
    }
}

let settings = new Settings();