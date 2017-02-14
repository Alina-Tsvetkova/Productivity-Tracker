class FinishPhaseModel {
    sendDataTaskFailed(timerKey) {
        let today = finishPhaseController.receiveDateOfTaskFinish();
        firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + timerKey).update({
            taskIsDone: 'failed',
            priority: 'Failed',
            dateOfFinish: today,
        });
    }

    sendDataTaskDone(timerKey) {
        let today = finishPhaseController.receiveDateOfTaskFinish();
        firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/tasks/' + timerKey).update({
            taskIsDone: true,
            dateOfFinish: today
        });
    }
}

let finishPhaseModel = new FinishPhaseModel();