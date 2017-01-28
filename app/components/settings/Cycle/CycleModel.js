class CycleModel extends Cycle {

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
