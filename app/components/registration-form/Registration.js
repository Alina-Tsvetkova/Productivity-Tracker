class Registration {
    checkUserInfo() {
        let signUpValidator = {
            loginField: document.getElementsByClassName('email')[0],
            passwordField: document.getElementsByClassName('password')[0],
            inputGroups: document.getElementsByClassName('registration-field')
        };
        event.preventDefault();
        let email = document.getElementsByClassName('email')[0].value;
        let password = document.getElementsByClassName('password')[0].value;
        if (email != '' && password != '') {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                let userNew = new UserData(user.uid, user.email);
                userNew.writeUserData();
                classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
                userRegistration.downloadCompleteSignUp();
            }).catch(function (error) {
                for (let k = 0; k < document.getElementsByClassName('registration-fail').length; k++) {
                    classManager.removeClass(document.getElementsByClassName('registration-fail')[k], 'no-validate');
                }
                classManager.removeClass(signUpValidator.passwordField, 'invalid-field');
                classManager.removeClass(signUpValidator.loginField, 'invalid-field');
                let errorCode = error.code;
                if (errorCode == 'auth/email-already-in-use') {
                    document.getElementsByClassName('registration-fail')[0].classList.add('no-validate');
                    document.getElementsByClassName('email')[0].classList.add('invalid-field');
                }
                if (errorCode == 'auth/weak-password') {
                    document.getElementsByClassName('registration-fail')[1].classList.add('no-validate');
                    document.getElementsByClassName('password')[0].classList.add('invalid-field');
                }
                return false;
            });
        } else {
            console.log('fill in both fields');
        }
    }

    downloadCompleteSignUp() {
        let completeSignUpBinder = new Binder('app/components/registration-form/registration-complete.html');
        let regComplete = completeSignUpBinder.downloadComponent();
        document.getElementById('wrapper').appendChild(regComplete.getElementsByClassName('sign-up-complete-wrapper')[0]);
        setTimeout(function () {
            document.getElementsByClassName('sign-up-complete-wrapper')[0].classList.add('sign-up-complete-appearance');
        }, 500);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-up-complete-btn')[0], userRegistration.submitCompleteSignUp);
    }

    cancelRegistration() {
        event.preventDefault();
        classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
    }

    submitCompleteSignUp() {
        event.preventDefault();
        classManager.removeClass(document.getElementsByClassName('sign-up-complete-wrapper')[0], 'sign-up-complete-appearance');
    }
}

let userRegistration = new Registration();