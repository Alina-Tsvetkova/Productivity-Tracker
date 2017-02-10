class RegistrationController {
    get getSignUpValidator() {
        return {
            loginField: document.getElementsByClassName('email')[0],
            passwordField: document.getElementsByClassName('password')[0],
            inputGroups: document.getElementsByClassName('registration-field'),
            failBlocks: document.getElementsByClassName('registration-fail')
        }
    }

    checkUserInfo(event) {
        event.preventDefault();
        let signUpValidator = registrationController.getSignUpValidator;
        if (signUpValidator.loginField.value != '' && signUpValidator.passwordField.value != '') {
            registrationModel.createUserInDB();
        } else {
            registrationView.warnToFillBothFields();
        }
    }

    cancelRegistration(event) {
        event.preventDefault();
        classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
    }

    submitCompleteSignUp() {
        classManager.removeClass(document.getElementsByClassName('sign-up-complete-wrapper')[0], 'sign-up-complete-appearance');
        location.reload();
    }

    proceedRegistrationErrors(errorCode) {
        let signUpValidator = registrationController.getSignUpValidator;
        for (let k = 0; k < signUpValidator.failBlocks.length; k++) {
            classManager.removeClass(signUpValidator.failBlocks[k], 'no-validate');
        }
        classManager.removeClass(signUpValidator.passwordField, 'invalid-field');
        classManager.removeClass(signUpValidator.loginField, 'invalid-field');

        if (errorCode == 'auth/email-already-in-use') {
            registrationView.addBorderToInvalidInput('registration-fail', 0, signUpValidator.failBlocks, "The email address is already in use by another account");
            registrationView.addInvalidField(signUpValidator.loginField);
        }
        if (errorCode == 'auth/weak-password') {
            registrationView.addBorderToInvalidInput('registration-fail', 1, signUpValidator.failBlocks, "Password should be at least 6 characters");
            registrationView.addInvalidField(signUpValidator.passwordField);
        }
    }

    successUserCreation () {
        classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
        registrationView.downloadCompleteSignUp();
    }

}

let registrationController = new RegistrationController();