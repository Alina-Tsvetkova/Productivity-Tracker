class CycleModel {
    static createCycle(event) {
        let savedCycle = new CycleModel();
        savedCycle.saveUserCycle(localStorage.getItem('currentUser'),event);
    }

    saveUserCycle(userId,event) {
        cycleController.getDataForCycle();
        firebase.database().ref('users/' + userId).update({
            cycle: {
                "workTime": cycleController.workTime,
                "workIteration": cycleController.workIteration,
                "shortBreak": cycleController.shortBreak,
                "longBreak": cycleController.longBreak
            }
        });

        Categories.notifyAboutSuccessfulSave(event);
    }

    static receiveCycleData() {
        let userId = localStorage.getItem('currentUser');
        let cycleReceiver = firebase.database().ref('users/' + userId + '/cycle');
        cycleReceiver.on('value', function (data) {
            cycleController.receiveCycleDataForRender(data.val());
        });
    }
}
