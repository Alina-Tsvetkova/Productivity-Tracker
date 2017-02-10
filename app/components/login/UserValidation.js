class UserValidation {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }

    static get getLogInObject() {
        return {
            loginField: document.getElementsByClassName('for-username')[0],
            passwordField: document.getElementsByClassName('for-password')[0],
            inputGroups: document.getElementsByClassName('input-groups'),
            logInFields: document.getElementsByClassName('fail-validation')
        }
    }

    checkLoginPass(event) {
        event.preventDefault();
        let loginObject = UserValidation.getLogInObject;
        firebase.auth().signInWithEmailAndPassword(loginObject.loginField.value, loginObject.passwordField.value).then(function (user) {
            let userNew = new UserData(user.uid, user.email);
            userNew.saveUserDataLocally();
            let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            Settings.downloadSettings();
        }).catch(function (error) {
            checkLoginPassObj.proceedSignInErrors(error.code);
            return false;
        });
    }

    proceedSignInErrors(errorCode) {
        let loginObject = UserValidation.getLogInObject;
        for (let k = 0; k < loginObject.logInFields.length; k++) {
            classManager.removeClass(loginObject.logInFields[k], 'no-validate');
        }
        classManager.removeClass(loginObject.passwordField, 'invalid-field');
        classManager.removeClass(loginObject.loginField, 'invalid-field');

        if (errorCode == 'auth/wrong-password') {
            Registration.addBorderToInvalidInput('fail-validation', 1);
            Registration.addInvalidField(loginObject.passwordField);
        }
        if (errorCode == 'auth/user-not-found') {
            Registration.addBorderToInvalidInput('fail-validation', 0);
            Registration.addInvalidField(loginObject.loginField);
        }
    }

    downloadSignUp(event) {
        event.preventDefault();
        let registrationFormBinder = new Binder('app/components/registration-form/registration-form.html');
        let regFom = registrationFormBinder.downloadComponent();
        document.getElementById('wrapper').appendChild(regFom.getElementsByClassName('form-registration')[0]);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('submit-sign-up'), userRegistration.checkUserInfo);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-registration-form'), userRegistration.cancelRegistration);
        setTimeout(function () {
            document.getElementsByClassName('form-registration')[0].classList.add('form-registration-appearance');
        }, 500);
    }
}


let checkLoginPassObj = new UserValidation();









