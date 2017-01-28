class UserValidation {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }

    checkLoginPass(event) {
        let loginValidator = {
            loginField: document.getElementsByClassName('for-username')[0].value,
            passwordField: document.getElementsByClassName('for-password')[0].value,
            inputGroups: document.getElementsByClassName('input-groups')
        };


        firebase.auth().signInWithEmailAndPassword(loginValidator.loginField, loginValidator.passwordField).then(function (user) {
            let userNew = new UserData(user.uid, user.email);
            userNew.saveUserDataLocally();
            let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            Settings.downloadSettings();
        }).catch(function (error) {
            if (error.code == 'auth/wrong-password') {
                document.getElementsByClassName('fail-validation')[1].classList.add('no-validate');
            }
            if (error.code == 'auth/user-not-found') {
                document.getElementsByClassName('fail-validation')[0].classList.add('no-validate');
            }
        });
    }
}


let checkLoginPassObj = new UserValidation('test@mail.ua', '123456');

document.body.onclick = function (event) {
    if (event.target == document.getElementsByClassName('sign-in')[0]) {
        event.preventDefault();
        checkLoginPassObj.checkLoginPass();
    }

    if (event.target == document.getElementsByClassName('sign-up')[0]) {
        event.preventDefault();
        let registrationFormBinder = new Binder('app/components/registration-form/registration-form.html');
        let regFom = registrationFormBinder.downloadComponent();
        document.getElementById('wrapper').appendChild(regFom.getElementsByClassName('form-registration')[0]);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('submit-sign-up'), userRegistration.takeUserInfo);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-registration-form'), userRegistration.cancelRegistration);
        setTimeout(function () {
            document.getElementsByClassName('form-registration')[0].classList.add('form-registration-appearance');

        }, 500);

    }
};









