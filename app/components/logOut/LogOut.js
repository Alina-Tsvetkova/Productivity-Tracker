class LogOut {
    logOutUser() {
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('currentUser');
            appStarter.downloadLoginPage();
        }, function (error) {
            return 'An error has occured!';
        });
    };

    cancelLogOut() {
        event.preventDefault();
        console.log('canceled');
        classManager.removeClass(document.getElementsByClassName('log-out-form-wrapper')[0], 'log-out-form-wrapper-appearance');
        setTimeout(function () {
            document.getElementById('wrapper').removeChild(document.getElementsByClassName('log-out-form-wrapper')[0]);
        }, 1000);
    }

    logOutWrapper () {
        let logOutBinder = new Binder('app/components/logOut/logOut.html');
        let logOutElem = logOutBinder.downloadComponent();
        document.getElementById('wrapper').appendChild(logOutElem.getElementsByClassName('log-out-form-wrapper')[0]);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('close-log-out-form'), function () {
            loggedUser.cancelLogOut();
        });
        setTimeout(function () {
            document.getElementsByClassName('log-out-form-wrapper')[0].classList.add('log-out-form-wrapper-appearance');
        }, 500);

        ElementsListener.listenToEvents('click', document.getElementsByClassName('log-out-btn'), function () {
            loggedUser.logOutUser();
        }, 500);
    }
}

let loggedUser = new LogOut();