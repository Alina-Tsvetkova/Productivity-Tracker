class Registration {

    takeUserInfo() {
        userRegistration.checkUserInfo();
    }

    checkUserInfo() {
        let email = document.getElementsByClassName('email')[0].value;
        let password = document.getElementsByClassName('password')[0].value;
        console.log(email,password );
        if (email != '' && password != '') {
            firebase.auth().createUserWithEmailAndPassword(email , password).then(function (user) {
                console.log('everything went fine');
                console.log('user object:' + user);
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
}

let userRegistration = new Registration();