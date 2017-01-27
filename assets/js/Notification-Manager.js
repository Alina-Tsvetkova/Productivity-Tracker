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
                    var notification = new Notification(message);
                }
            });
        }

        Notification.requestPermission();
        function spawnNotification(theBody, theIcon, theTitle) {
            var options = {
                title: theTitle,
                body: theBody,
                icon: theIcon
            }
            var n = new Notification(theTitle, options);
        }
    };
}

window.addEventListener('offline', function () {
    NotificationManager.showNotification("There is no Internet Connection!", 'images/tomato-failed.png', 'Productivity Tracker');
});

window.addEventListener('online', function () {
    NotificationManager.showNotification("Internet Connection has appeared!!", 'images/tomato_fill.png', 'Productivity Tracker');
});

