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
        let loginObject = userValidationController.getLogInObject;
        if (loginObject.loginField.value == '' && loginObject.passwordField.value == '') {
            userValidationController.proceedSignInErrors('fill-both-values');
        } else {
            userValidationModel.openSessionForUser();
        }
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
        if (errorCode == 'fill-both-values') {
            userValidationController.warnToFillBothFields();
        }
    }

    warnToFillBothFields() {
        let signInValidator = userValidationController.getLogInObject;
        for (let k = 0; k < signInValidator.logInFields.length; k++) {
            registrationView.addInvalidField(signInValidator.loginField, signInValidator.passwordField);
            signInValidator.logInFields[k].classList.add('no-validate');
            signInValidator.logInFields[k].innerHTML = 'Fill in both values';
        }
    }
}

let userValidationController = new UserValidationController();