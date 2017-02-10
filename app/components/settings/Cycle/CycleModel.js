class CycleModel extends CycleController {
    static createCycle(event) {
        let savedCycle = new CycleModel();
        savedCycle.saveUserCycle(localStorage.getItem('currentUser'),event);
    }

    saveUserCycle(userId,event) {
        this.getDataForCycle();
        firebase.database().ref('users/' + userId).update({
            cycle: {
                "workTime": this.workTime,
                "workIteration": this.workIteration,
                "shortBreak": this.shortBreak,
                "longBreak": this.longBreak
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
