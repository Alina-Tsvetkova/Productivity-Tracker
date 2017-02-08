class UserData {
    constructor(userId, email) {
        this.userId = userId;
        this.email = email;
    }

    writeUserData() {

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

    saveUserDataLocally() {
        localStorage.setItem('currentUser', this.userId);
    }

    static getUserDataLocally() {
        return localStorage.getItem('currentUser');
    }
}
