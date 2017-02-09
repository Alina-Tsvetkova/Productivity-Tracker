class CycleModel extends Cycle {
    static createCycle() {
        let savedCycle = new CycleModel();
        savedCycle.saveUserCycle(localStorage.getItem('currentUser'));
    }

    saveUserCycle(userId) {
        this.getDataForCycle();
        firebase.database().ref('users/' + userId).update({
            cycle: {
                "workTime": this.workTime,
                "workIteration": this.workIteration,
                "shortBreak": this.shortBreak,
                "longBreak": this.longBreak
            }
        });

        Categories.notifyAboutSuccessfulSave();
        CategoriesView.renderEarlierSavedCategories();
    }

    static receiveCycleData() {
        let userId = localStorage.getItem('currentUser');
        let cycleReceiver = firebase.database().ref('users/' + userId + '/cycle');
        cycleReceiver.on('value', function (data) {
            myCycle.renderSavedCycleSettings(data.val());
        });
    }
}
