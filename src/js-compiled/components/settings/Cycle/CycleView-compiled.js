"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CycleView = function () {
    function CycleView() {
        _classCallCheck(this, CycleView);
    }

    _createClass(CycleView, [{
        key: "renderSavedCycleSettings",
        value: function renderSavedCycleSettings(cycleValue) {
            var cycleElements = cycleController.initializeCycleElements;
            try {
                cycleElements.longBreak.value = cycleValue.longBreak + " min";
                cycleElements.shortBreak.value = cycleValue.shortBreak + " min";
                cycleElements.workIteration.value = cycleValue.workIteration;
                cycleElements.workTime.value = cycleValue.workTime + " min";
                cycleController.getDataForCycle();
            } catch (e) {
                return 'element is already removed from DOM';
            }
        }
    }, {
        key: "createWorkTime",
        value: function createWorkTime() {
            DOMElementsInitializer.cycle.innerHTML = '';
            cycleView.generateWorkAndBreakIt();
            cycleView.generateLongBreak();
            cycleView.showFullCycle();
        }
    }, {
        key: "generateWorkAndBreakIt",
        value: function generateWorkAndBreakIt() {
            for (var k = 0; k < cycleController.getWorkIterations(); k++) {
                var workPart = document.createElement('div');
                workPart.classList.add('workPartsStyles');
                workPart.style.width = cycleController.countWorkTime();
                DOMElementsInitializer.cycle.appendChild(workPart);
                if (k < cycleController.getWorkIterations() - 1) {
                    // no need to have break after last work time
                    cycleView.generateShortBreak();
                }
            }
        }
    }, {
        key: "generateLongBreak",
        value: function generateLongBreak() {
            var longBreak = document.createElement('div');
            longBreak.classList.add('longBreakStyles');
            longBreak.style.width = cycleController.countLongBreak();
            DOMElementsInitializer.cycle.appendChild(longBreak);
        }
    }, {
        key: "generateShortBreak",
        value: function generateShortBreak() {
            var shortBreakPart = document.createElement('div');
            shortBreakPart.classList.add('breakPartsStyles');
            shortBreakPart.style.width = cycleController.countShortBreak();
            DOMElementsInitializer.cycle.appendChild(shortBreakPart);
        }
    }, {
        key: "showFullCycle",
        value: function showFullCycle() {
            var fullCycleTitle = document.createElement('span');
            fullCycleTitle.classList.add('fullCycleTitleStyles');
            cycleController.countFullCycleHours(fullCycleTitle);
            DOMElementsInitializer.cycle.appendChild(fullCycleTitle);
            cycleView.generateWorkAndBreakIt();
        }
    }, {
        key: "showPartsCycleHours",
        value: function showPartsCycleHours(elem, mainElem) {
            mainElem.appendChild(elem);
            DOMElementsInitializer.timePoints.appendChild(mainElem);
        }
    }, {
        key: "createCycleTitle",
        value: function createCycleTitle() {
            var smallCycleTitle = document.createElement('span');
            smallCycleTitle.classList.add('smallCycleTitleStyles');
            return smallCycleTitle;
        }
    }, {
        key: "createCycleWrapper",
        value: function createCycleWrapper() {
            var wrapperCycleTitle = document.createElement('div');
            wrapperCycleTitle.classList.add('wrapperCycleTitleStyles');
            return wrapperCycleTitle;
        }
    }, {
        key: "renderPartsCycleMinutes",
        value: function renderPartsCycleMinutes(smallCycleTitle) {
            smallCycleTitle.innerHTML = '';

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var argsArr = [].concat(args);
            for (var j = 0; j < argsArr.length; j++) {
                smallCycleTitle.innerHTML += argsArr[j];
            }
        }
    }]);

    return CycleView;
}();

var cycleView = new CycleView();
//# sourceMappingURL=CycleView-compiled.js.map
