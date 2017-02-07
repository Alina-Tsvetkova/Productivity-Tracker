class Registration {
    static get getSignUpValidator() {
        return {
            loginField: document.getElementsByClassName('email')[0],
            passwordField: document.getElementsByClassName('password')[0],
            inputGroups: document.getElementsByClassName('registration-field'),
            failBlocks: document.getElementsByClassName('registration-fail')
        }
    }

    checkUserInfo() {
        event.preventDefault();
        let signUpValidator = Registration.getSignUpValidator;
        console.log(signUpValidator);
        if (signUpValidator.loginField.value != '' && signUpValidator.passwordField.value != '') {
            firebase.auth().createUserWithEmailAndPassword(signUpValidator.loginField.value, signUpValidator.passwordField.value).then(function (user) {
                let userNew = new UserData(user.uid, user.email);
                userNew.writeUserData();
                classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
                userRegistration.downloadCompleteSignUp();
            }).catch(function (error) {
                let errorCode = error.code;
                userRegistration.proceedRegistrationErrors(errorCode);
                return false;
            });
        } else {
            for (let k = 0; k < signUpValidator.failBlocks.length; k++) {
                Registration.addInvalidField(signUpValidator.loginField, signUpValidator.passwordField);
                signUpValidator.failBlocks[k].classList.add('no-validate');
                signUpValidator.failBlocks[k].innerHTML = 'Fill in both values';
            }
        }
    }

    proceedRegistrationErrors(errorCode) {
        let signUpValidator = Registration.getSignUpValidator;
        for (let k = 0; k < signUpValidator.failBlocks.length; k++) {
            classManager.removeClass(signUpValidator.failBlocks[k], 'no-validate');
        }
        classManager.removeClass(signUpValidator.passwordField, 'invalid-field');
        classManager.removeClass(signUpValidator.loginField, 'invalid-field');

        if (errorCode == 'auth/email-already-in-use') {
            Registration.addBorderToInvalidInput('registration-fail', 0, signUpValidator.failBlocks, "The email address is already in use by another account");
            Registration.addInvalidField(signUpValidator.loginField);
        }
        if (errorCode == 'auth/weak-password') {
            Registration.addBorderToInvalidInput('registration-fail', 1, signUpValidator.failBlocks, "Password should be at least 6 characters");
            Registration.addInvalidField(signUpValidator.passwordField);
        }
    }

    static addBorderToInvalidInput(element, index, elem2, str) {
        try {
            document.getElementsByClassName(element)[index].classList.add('no-validate');
            elem2[index].innerHTML = str;
        } catch (e){
            return 'no element on the page';
        }
    }

    static addInvalidField(element) {
        for (let k = 0; k < arguments.length; k++) {
            arguments[k].classList.add('invalid-field');
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