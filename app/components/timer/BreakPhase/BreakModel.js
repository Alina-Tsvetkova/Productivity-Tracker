class BreakModel {

    receiveTimeOfBreak(elem1, elem2, elem3) {
        let breakTimeDuration;
        firebase.database().ref('users/' + RegistrationModel.getUserDataLocally() + '/cycle').on('value', function (data) {
            breakTimeDuration = data.val().shortBreak;
            breakController.addBreakAnimationDuration(elem1, elem2, elem3, breakTimeDuration);
            return breakTimeDuration;
        });
        return breakTimeDuration;
    }
}

let breakModel = new BreakModel();