class AppStarter {
    downloadLoginPage() {
        let loginBinder = new Binder('app/components/login/login.html', document.body);
        loginBinder.downloadComponent();
        Router.addHash("");
        let userId = localStorage.getItem('currentUser');
        ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-in'), checkLoginPassObj.checkLoginPass);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('sign-up'), checkLoginPassObj.downloadSignUp);
        if (userId != null) {
            let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            Settings.downloadSettings();
        }
        else if (userId == null) return false;
    }
}

let appStarter = new AppStarter();

appStarter.downloadLoginPage();

