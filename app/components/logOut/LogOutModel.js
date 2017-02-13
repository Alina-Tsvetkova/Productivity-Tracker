class LogOutModel {
    logOutUser() {
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('currentUser');
            appStarter.downloadLoginPage();
        }, function (error) {
            logOutController.proceedErrors(error);
        });
    };
}

let logOutModel = new LogOutModel();