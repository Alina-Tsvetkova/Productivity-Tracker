class UserValidationView {
    downloadSignUp(event) {
        event.preventDefault();
        let registrationFormBinder = new Binder('app/components/registration/registration-form.html');
        let regFom = registrationFormBinder.downloadComponent();
        userValidationView.appendSignUp(regFom);
    }

    appendSignUp (regFom) {
        document.getElementById('wrapper').appendChild(regFom.getElementsByClassName('form-registration')[0]);
        userValidationController.subscribeValidationEvents();
        setTimeout(function () {
            document.getElementsByClassName('form-registration')[0].classList.add('form-registration-appearance');
        }, 500);
    }
}

let userValidationView = new UserValidationView();