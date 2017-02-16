'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CycleController = function () {
    function CycleController(workTime, workIteration, shortBreak, longBreak) {
        _classCallCheck(this, CycleController);

        this.workTime = +workTime;
        this.workIteration = +workIteration;
        this.shortBreak = +shortBreak;
        this.longBreak = +longBreak;
    }

    _createClass(CycleController, [{
        key: 'runCycle',
        value: function runCycle() {
            cycleController.subscribeOnCycle();
            CycleModel.receiveCycleData();
        }
    }, {
        key: 'receiveCycleDataForRender',
        value: function receiveCycleDataForRender(data) {
            cycleView.renderSavedCycleSettings(data);
        }
    }, {
        key: 'getDataForCycle',
        value: function getDataForCycle() {
            // this function is needful to transfer data from document inputs to cycle object
            var cycleElements = cycleController.initializeCycleElements;
            this.workTime = parseInt(cycleElements.workTime.value);
            this.workIteration = parseInt(cycleElements.workIteration.value);
            this.shortBreak = parseInt(cycleElements.shortBreak.value);
            this.longBreak = parseInt(cycleElements.longBreak.value);
            cycleView.createWorkTime();
        }
    }, {
        key: 'changeCycleData',
        value: function changeCycleData(target) {
            var element = DOMElementsInitializer.counters[DOMElementsInitializer.buttonsArr.indexOf(target)];
            if (target.classList.contains('dicrement') || target.parentNode.classList.contains('dicrement')) {
                element = DOMElementsInitializer.counters[DOMElementsInitializer.buttonsArr.indexOf(target) % 4];
            }
            var modifiedElement = target.parentNode.getElementsByClassName('field')[0];
            var regTakeInt = /[0-9]+/g;
            if (!element) {
                return;
            }
            var changedSum = element.value;
            changedSum = parseInt(changedSum.match(regTakeInt));

            cycleController.restrictCycleValues(target, modifiedElement, element, changedSum);
            this.getDataForCycle();
        }
    }, {
        key: 'restrictCycleValues',
        value: function restrictCycleValues(target, modifiedElement, element, changedSum) {
            // each input has special step
            if (element.classList.contains('counter-work-iteration') || element.classList.contains('counter-short-break')) {
                if (target.classList.contains('increment')) changedSum++;else changedSum--;
            } else if (element.classList.contains('counter-work-time') || element.classList.contains('counter-long-time')) {
                if (target.classList.contains('increment')) changedSum += 5;else changedSum -= 5;
            }

            // inputs should have it's max and min values

            if (element.classList.contains('counter-work-time')) {
                if (changedSum > 40 || changedSum < 15) return;
            } else if (element.classList.contains('counter-short-break')) {
                if (changedSum > 15 || changedSum < 1) return;
            } else if (element.classList.contains('counter-long-time')) {
                if (changedSum > 60 || changedSum < 30) return;
            }

            if (element.classList.contains('counter-work-iteration')) {
                if (changedSum > 5 || changedSum < 1) return;
                modifiedElement.value = changedSum;
            } else {
                modifiedElement.value = changedSum + ' min';
            }
            modifiedElement.classList.add('changedData');
        }
    }, {
        key: 'getWorkTime',
        value: function getWorkTime() {
            return this.workTime;
        }
    }, {
        key: 'getWorkIterations',
        value: function getWorkIterations() {
            return this.workIteration;
        }
    }, {
        key: 'getShortBreak',
        value: function getShortBreak() {
            return this.shortBreak;
        }
    }, {
        key: 'getLongBreak',
        value: function getLongBreak() {
            return this.longBreak;
        }
    }, {
        key: 'countAllWidth',
        value: function countAllWidth() {
            var workIteration = this.getWorkTime() + this.getShortBreak();
            var totalWidth = workIteration * this.getWorkIterations() * 2 - this.getShortBreak() * 2 + this.getLongBreak();
            return totalWidth;
        }
    }, {
        key: 'countWorkTime',
        value: function countWorkTime() {
            return this.workTime / this.countAllWidth() * 100 + '%';
        }
    }, {
        key: 'countLongBreak',
        value: function countLongBreak() {
            return this.longBreak / this.countAllWidth() * 100 + '%';
        }
    }, {
        key: 'countShortBreak',
        value: function countShortBreak() {
            return this.shortBreak / this.countAllWidth() * 100 + '%';
        }
    }, {
        key: 'countFullCycleHours',
        value: function countFullCycleHours(elem) {
            var workIteration = this.workTime + this.shortBreak;
            var totalWidth = workIteration * this.workIteration - this.shortBreak + this.longBreak;
            var totalHours = parseInt(totalWidth / 60);
            var totalMinutes = parseInt(totalWidth % 60);
            cycleView.renderPartsCycleMinutes(elem, 'Full cycle: ', totalHours, 'h', totalMinutes, 'm');
            this.countPartsCycleHours();
        }
    }, {
        key: 'countPartsCycleHours',
        value: function countPartsCycleHours() {
            DOMElementsInitializer.timePoints.innerHTML = '';
            var totalTime = this.countAllWidth();
            var totalMinutes = 30;
            var totalHours = 0;
            if (window.innerWidth > 640) {
                for (var k = 0; k < totalTime / 30 - 1; k++) {
                    var smallCycleTitle = cycleView.createCycleTitle();
                    var wrapperCycleTitle = cycleView.createCycleWrapper();
                    smallCycleTitle.classList.add('smallCycleTitleStyles');
                    cycleView.renderPartsCycleMinutes(smallCycleTitle, totalHours, 'h', totalMinutes, 'm');
                    wrapperCycleTitle.style.width = 30 / totalTime * 100 + '%';
                    if (totalHours == 0) {
                        cycleView.renderPartsCycleMinutes(smallCycleTitle, totalMinutes, 'm');
                    }
                    if (totalMinutes % 60 == 0) {
                        totalHours += 1;
                        totalMinutes -= 60;
                        cycleView.renderPartsCycleMinutes(smallCycleTitle, totalHours, 'h', totalMinutes, 'm');
                    }
                    if (totalMinutes == 0) {
                        cycleView.renderPartsCycleMinutes(smallCycleTitle, totalHours, 'h');
                    }
                    totalMinutes += 30;
                    cycleView.showPartsCycleHours(smallCycleTitle, wrapperCycleTitle);
                }
            } else {
                for (var _k = 0; _k < totalTime / 60 - 1; _k++) {
                    var _smallCycleTitle = cycleView.createCycleTitle();
                    var _wrapperCycleTitle = cycleView.createCycleWrapper();
                    totalHours++;
                    cycleView.renderPartsCycleMinutes(_smallCycleTitle, totalHours, 'h');
                    _wrapperCycleTitle.style.width = 60 / totalTime * 100 + '%';
                    cycleView.showPartsCycleHours(_smallCycleTitle, _wrapperCycleTitle);
                }
            }
        }
    }, {
        key: 'subscribeOnCycle',
        value: function subscribeOnCycle() {
            ElementsListener.listenToEvents('click', document.getElementsByClassName('increment'), function (event) {
                var target = event.target.parentNode;
                if (navigator.userAgent == 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0') {
                    target = event.target;
                }
                event.stopPropagation();
                cycleController.changeCycleData(target);
            });

            ElementsListener.listenToEvents('click', document.getElementsByClassName('dicrement'), function (event) {
                var target = event.target.parentNode;
                if (navigator.userAgent == 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0') {
                    target = event.target;
                }
                event.stopPropagation();
                cycleController.changeCycleData(target);
            });
            ElementsListener.listenToEvents('click', document.getElementsByClassName('save-cycle-btn'), CycleModel.createCycle);
            ElementsListener.listenToEvents('click', document.getElementsByClassName('next-btn'), function () {
                counterOfTasks = 0;
                Router.addHash("task-list");
            });
        }
    }, {
        key: 'initializeCycleElements',
        get: function get() {
            return {
                longBreak: document.getElementsByClassName('counter-long-time')[0],
                shortBreak: document.getElementsByClassName('counter-short-break')[0],
                workIteration: document.getElementsByClassName('counter-work-iteration')[0],
                workTime: document.getElementsByClassName('counter-work-time')[0]
            };
        }
    }]);

    return CycleController;
}();

var DOMElementsInitializer = void 0;
var cycleController = new CycleController();
//# sourceMappingURL=CycleController-compiled.js.map
