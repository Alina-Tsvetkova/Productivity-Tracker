class RegistrationView {
    downloadCompleteSignUp() {
        let completeSignUpBinder = new Binder('app/components/registration/registration-complete.html');
        let regComplete = completeSignUpBinder.downloadComponent();
        document.getElementById('wrapper').appendChild(regComplete.getElementsByClassName('sign-up-complete-wrapper')[0]);
        setTimeout(function () {
            document.getElementsByClassName('sign-up-complete-wrapper')[0].classList.add('sign-up-complete-appearance');
        }, 500);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-up-complete-btn')[0], registrationController.submitCompleteSignUp);
    }

     addBorderToInvalidInput(element, index, elem2, str) {
        try {
            document.getElementsByClassName(element)[index].classList.add('no-validate');
            elem2[index].innerHTML = str;
        } catch (e) {
            return 'no element on the page';
        }
    }

     addInvalidField(element) {
        for (let k = 0; k < arguments.length; k++) {
            arguments[k].classList.add('invalid-field');
        }
    }

    warnToFillBothFields() {
        let signUpValidator = registrationController.getSignUpValidator;
        for (let k = 0; k < signUpValidator.failBlocks.length; k++) {
            registrationView.addInvalidField(signUpValidator.loginField, signUpValidator.passwordField);
            signUpValidator.failBlocks[k].classList.add('no-validate');
            signUpValidator.failBlocks[k].innerHTML = 'Fill in both values';
        }
    }
}

let registrationView = new RegistrationView();