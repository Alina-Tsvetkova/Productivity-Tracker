class Registration {

    checkUserInfo() {
        event.preventDefault();
        let email = document.getElementsByClassName('email')[0].value;
        let password = document.getElementsByClassName('password')[0].value;
        console.log(email, password);
        if (email != '' && password != '') {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                alert('everything went fine');
                let userNew = new UserData(user.uid, user.email);
                userNew.writeUserData();
                classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
            }).catch(function (error) {
                console.log('there was an error');
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode + ' - ' + errorMessage);
            });


        } else {
            console.log('fill in both fields');
        }
    }

    cancelRegistration() {
        event.preventDefault();
        classManager.removeClass(document.getElementsByClassName('form-registration')[0], 'form-registration-appearance');
    }
}

let userRegistration = new Registration();