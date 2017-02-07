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
    }
}
