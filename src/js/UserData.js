class UserData {
    constructor(userId, email) {
        this.userId = userId;
        this.email = email;
    }

    writeUserData() {
        firebase.database().ref('users/' + this.userId).set({
            username: this.email,
            categories: ['Work', 'Education', 'Hobby', 'Sport', 'Other'],
            cycle: {
                "workTime": 25,
                "workIteration": 5,
                "shortBreak": 5,
                "longBreak": 45
            }
        });
    }

    saveUserDataLocally() {
        localStorage.setItem('currentUser', this.userId);
    }

    static getUserDataLocally() {
        return localStorage.getItem('currentUser');
    }
}
