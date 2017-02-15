"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Settings = function () {
    function Settings() {
        _classCallCheck(this, Settings);
    }

    _createClass(Settings, [{
        key: "addSaveMessage",
        value: function addSaveMessage(event) {
            if (event.target.classList.contains('save-btn-categories')) {
                document.getElementsByClassName('save-form')[0].innerHTML = "Categories were successfully Saved!";
            } else {
                document.getElementsByClassName('save-form')[0].innerHTML = "Cycle was successfully Saved!";
            }
        }
    }], [{
        key: "downloadSettings",
        value: function downloadSettings() {
            Router.addHash("settings-cycle");
            var settingsBinder = new Binder('app/components/settings/settings.html', document.body);
            settingsBinder.downloadComponent();
            DOMElementsInitializer = Settings.settingsObj;
            categoriesController.runCategories(); // plug in categories module
            Binder.downloadPlugins("#tabs");
            cycleController.runCycle();
            Icons.iconLinksBinder();
        }
    }, {
        key: "notifyAboutSuccessfulSave",
        value: function notifyAboutSuccessfulSave(event) {
            var modalBinder = new Binder('app/components/settings/save-form.html');
            var receivedDoc = modalBinder.downloadComponent();
            document.body.appendChild(receivedDoc.getElementById('save-form-wrapper'));
            settings.addSaveMessage(event);
            setTimeout(function () {
                document.getElementById('save-form-wrapper').classList.add('save-form-wrapper-appearance');
            }, 200);
            setTimeout(function () {
                Settings.removeNotificationSave();
            }, 2000);
        }
    }, {
        key: "removeNotificationSave",
        value: function removeNotificationSave() {
            $('#save-form-wrapper').fadeOut(1500);
            setTimeout(function () {
                try {
                    document.body.removeChild(document.getElementById('save-form-wrapper'));
                } catch (e) {
                    return 'element is already removed';
                }
            }, 3000);
        }
    }, {
        key: "settingsObj",
        get: function get() {
            return {
                settingsVariants: document.getElementsByClassName('settings-variants')[0],
                increaseButtons: document.getElementsByClassName('increment'),
                decreaseButtons: document.getElementsByClassName('dicrement'),
                cycle: document.getElementsByClassName('cycle-info')[0],
                counters: document.getElementsByClassName('field'),
                countersArr: Array.prototype.slice.call(document.getElementsByClassName('field')),
                buttonsArr: Array.prototype.slice.call(document.getElementsByClassName('increment')).concat(Array.prototype.slice.call(document.getElementsByClassName('dicrement'))),
                timePoints: document.getElementsByClassName('time-points')[0]
            };
        }
    }]);

    return Settings;
}();

var settings = new Settings();
//# sourceMappingURL=Settings-compiled.js.map
