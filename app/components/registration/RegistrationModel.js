class RegistrationModel {
    createUserInDB() {
        let signUpValidator = registrationController.getSignUpValidator;
        firebase.auth().createUserWithEmailAndPassword(signUpValidator.loginField.value, signUpValidator.passwordField.value).then(function (user) {
            let userNew = new UserData(user.uid, user.email);
            registrationModel.writeDefaultUserData.call(userNew);
            registrationController.successUserCreation();
        }).catch(function (error) {
            let errorCode = error.code;
            registrationController.proceedRegistrationErrors(errorCode);
            return false;
        });
    }

    writeDefaultUserData() {
        let monthAndCounterBinding = {
            'Urgent': new Array(30),
            'Middle': new Array(30),
            'High': new Array(30),
            'Low': new Array(30),
            'Failed': new Array(30)
        };


        for (let key in monthAndCounterBinding) {
            for (let l = 0; l <= 30; l++) {
                monthAndCounterBinding[key][l] = 0;
            }
        }

        firebase.database().ref('users/' + this.userId).set({
            username: this.email,
            categories: ['Work', 'Education', 'Hobby', 'Sport', 'Other'],
            cycle: {
                "workTime": 25,
                "workIteration": 5,
                "shortBreak": 5,
                "longBreak": 45
            },
            reports: monthAndCounterBinding,
            pomodoros: monthAndCounterBinding
        });
    }

    saveUserDataLocally(userId) {
        localStorage.setItem('currentUser', userId);
    }

    static getUserDataLocally() {
        return localStorage.getItem('currentUser');
    }
}

let registrationModel = new RegistrationModel();