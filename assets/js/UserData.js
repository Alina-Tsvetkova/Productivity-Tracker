class UserData {
    constructor(userId, email) {
        this.userId = userId;
        this.email = email;
    }

    writeUserData() {
        firebase.database().ref('users/' + this.userId).set({
            username: this.email,
            tasks: [{
                title: 'Add slider',
                description: 'Add slider to my web-site',
                category: 'JavaScript',
                deadline: '20.12.2016',
                estimation: '4',
                priority: 'Middle',
                color_indicator: '1',
                taskisdone: 'true',
                dailyTask: false
            }],
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
}
