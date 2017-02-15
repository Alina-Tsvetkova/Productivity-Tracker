class Router {

    static listenToHashChanges() {
        $(window).on('popstate', function (e) {

            if (window.location.hash == "#reports") {
                Reports.downloadReports();
            }
            else if (window.location.hash == "#settings-cycle") {
                Settings.downloadSettings();
            }
            else if (window.location.hash == "#task-list") {
                TaskList.moveToTaskList();
            }
        });
    }

    static addHash(hash) {
        window.location.hash = hash;
        return window.location.hash;
    }
}


Router.listenToHashChanges();