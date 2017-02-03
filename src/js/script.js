class AppStarter {
    downloadLoginPage() {
        let loginBinder = new Binder('app/components/login/login.html', document.body);
        loginBinder.downloadComponent();
        Router.addHash("");

        let userId = localStorage.getItem('currentUser');

        if (userId != null) {
            let settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            Settings.downloadSettings();
        }
    }
}

let appStarter = new AppStarter();

appStarter.downloadLoginPage();
