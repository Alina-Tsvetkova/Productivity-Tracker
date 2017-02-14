class AppStarter {
    downloadLoginPage() {
        let loginBinder = new Binder('app/components/login/login.html', document.body);
        loginBinder.downloadComponent();
        Router.addHash("");
        let userId = localStorage.getItem('currentUser');
        ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-in'), userValidationController.checkLoginAndPass);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-up'), userValidationView.downloadSignUp);
        if (userId != null) {
            window.location.hash = "#task-list";
            let isieEdge = (navigator.appName == "Netscape") && (navigator.appVersion.indexOf('Trident') === -1);
            if (isieEdge) {
                TaskList.moveToTaskList();
            }
        }
        else if (userId == null) return false;
    }
}

let appStarter = new AppStarter();

appStarter.downloadLoginPage();

