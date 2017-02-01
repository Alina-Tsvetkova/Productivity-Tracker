class LogOut {
    logOutUser() {
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('currentUser');
            location.reload();
        }, function (error) {
            console.log('An error occured!');
        });
    }

    cancelLogOut() {
        classManager.removeClass(document.getElementsByClassName('log-out-form-wrapper')[0], 'log-out-form-wrapper-appearance');
        setTimeout(function () {
            document.getElementById('wrapper').removeChild(document.getElementsByClassName('log-out-form-wrapper')[0]);
        }, 1000);
    }
}

let loggedUser = new LogOut();