class WorkPhaseModel {

    receiveDurationOfTimer(elem1, elem2, elem3) {
        let workTimeDuration;
        firebase.database().ref('users/' + UserData.getUserDataLocally() + '/cycle').on('value', function (data) {
            workTimeDuration = data.val().workTime;
            workPhaseController.addWorkAnimationDuration(elem1, elem2, elem3, workTimeDuration);
        });
        return workTimeDuration;
    }
}

let workPhaseModel = new WorkPhaseModel();