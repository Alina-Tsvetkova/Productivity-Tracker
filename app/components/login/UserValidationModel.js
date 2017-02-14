class UserValidationModel {
    openSessionForUser() {
        let loginObject = userValidationController.getLogInObject;
        firebase.auth().signInWithEmailAndPassword(loginObject.loginField.value, loginObject.passwordField.value).then(function (user) {
            registrationModel.saveUserDataLocally(user.uid);
            userValidationController.successfulSignIn();
        }).catch(function (error) {
            userValidationController.proceedSignInErrors(error.code);
            return false;
        });
    }
}

let userValidationModel = new UserValidationModel();