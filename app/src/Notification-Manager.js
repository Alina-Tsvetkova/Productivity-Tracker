class NotificationManager {

    static showNotification(message, img, website) {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        else if (Notification.permission === "granted") {
            spawnNotification(message, img, website);
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    let notification = new Notification(message);
                }
            });
        }

        Notification.requestPermission();
        function spawnNotification(theBody, theIcon, theTitle) {
            let options = {
                title: theTitle,
                body: theBody,
                icon: theIcon
            };
            let n = new Notification(theTitle, options);
        }
    };
}

window.addEventListener('offline', function () {
    NotificationManager.showNotification("There is no Internet Connection!", 'assets/img/tomato-failed.png', 'Productivity Tracker');
});

window.addEventListener('online', function () {
    NotificationManager.showNotification("Internet Connection has appeared!!", 'assets/img/tomato-fill.png', 'Productivity Tracker');
});

