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
        if (loginValidator.loginField === this.login && loginValidator.passwordField === this.password) {
            let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            Settings.downloadSettings();
        }
        if (loginValidator.passwordField !== this.password) {
            document.getElementsByClassName('fail-validation')[1].classList.add('no-validate');
        }

        if (loginValidator.loginField !== this.login) {
            document.getElementsByClassName('fail-validation')[0].classList.add('no-validate');
        }
    }
}


let checkLoginPassObj = new UserValidation('test@mail.ua', '123456');

document.body.onclick = function (event) {
    if (event.target == document.getElementsByClassName('submit-btn')[0]) {
        event.preventDefault();
        checkLoginPassObj.checkLoginPass();
    }
}







