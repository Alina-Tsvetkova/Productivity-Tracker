class UserValidationController {
    get getLogInObject() {
        return {
            loginField: document.getElementsByClassName('for-username')[0],
            passwordField: document.getElementsByClassName('for-password')[0],
            inputGroups: document.getElementsByClassName('input-groups'),
            logInFields: document.getElementsByClassName('fail-validation')
        }
    }

    successfulSignIn() {
        Settings.downloadSettings();
    }

    subscribeValidationEvents() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('submit-sign-up'), registrationController.checkUserInfo);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-registration-form'), registrationController.cancelRegistration);
    }

    checkLoginAndPass(event) {
        event.preventDefault();
        userValidationModel.openSessionForUser();
    }

    proceedSignInErrors(errorCode) {
        let loginObject = userValidationController.getLogInObject;
        for (let k = 0; k < loginObject.logInFields.length; k++) {
            classManager.removeClass(loginObject.logInFields[k], 'no-validate');
        }
        classManager.removeClass(loginObject.passwordField, 'invalid-field');
        classManager.removeClass(loginObject.loginField, 'invalid-field');

        if (errorCode == 'auth/wrong-password') {
            registrationView.addBorderToInvalidInput('fail-validation', 1);
            registrationView.addInvalidField(loginObject.passwordField);
        }
        if (errorCode == 'auth/user-not-found') {
            registrationView.addBorderToInvalidInput('fail-validation', 0);
            registrationView.addInvalidField(loginObject.loginField);
        }
    }
}

let userValidationController = new UserValidationController();