class CycleController {
    constructor(workTime, workIteration, shortBreak, longBreak) {
        this.workTime = +workTime;
        this.workIteration = +workIteration;
        this.shortBreak = +shortBreak;
        this.longBreak = +longBreak;
    }

    runCycle() {
        cycleController.subscribeOnCycle();
        CycleModel.receiveCycleData();
    }

    get initializeCycleElements() {
        return {
            longBreak: document.getElementsByClassName('counter-long-time')[0],
            shortBreak: document.getElementsByClassName('counter-short-break')[0],
            workIteration: document.getElementsByClassName('counter-work-iteration')[0],
            workTime: document.getElementsByClassName('counter-work-time')[0]
        }
    }

    receiveCycleDataForRender (data) {
        cycleView.renderSavedCycleSettings(data);
    }

    getDataForCycle() { // this function is needful to transfer data from document inputs to cycle object
        let cycleElements = cycleController.initializeCycleElements;
        this.workTime = parseInt(cycleElements.workTime.value);
        this.workIteration = parseInt(cycleElements.workIteration.value);
        this.shortBreak = parseInt(cycleElements.shortBreak.value);
        this.longBreak = parseInt(cycleElements.longBreak.value);
        cycleView.createWorkTime();
    }

    changeCycleData(target) {
        let element = DOMElementsInitializer.counters[DOMElementsInitializer.buttonsArr.indexOf(target)];
        if (target.classList.contains('dicrement') || target.parentNode.classList.contains('dicrement')) {
            element = DOMElementsInitializer.counters[DOMElementsInitializer.buttonsArr.indexOf(target) % 4];
        }
        let modifiedElement = target.parentNode.getElementsByClassName('field')[0];
        let regTakeInt = /[0-9]+/g;
        if (!(element)) {
            return;
        }
        let changedSum = element.value;
        changedSum = parseInt(changedSum.match(regTakeInt));

        cycleController.restrictCycleValues(target, modifiedElement, element, changedSum);
        this.getDataForCycle();
    }

    restrictCycleValues(target, modifiedElement, element, changedSum) {
        // each input has special step
        if (element.classList.contains('counter-work-iteration') || element.classList.contains('counter-short-break')) {
            if (target.classList.contains('increment')) changedSum++;
            else changedSum--;
        }

        else if (element.classList.contains('counter-work-time') || element.classList.contains('counter-long-time')) {
            if (target.classList.contains('increment')) changedSum += 5;
            else changedSum -= 5;
        }

        // inputs should have it's max and min values

        if (element.classList.contains('counter-work-time')) {
            if (changedSum > 40 || changedSum < 15) return;
        }
        else if (element.classList.contains('counter-short-break')) {
            if (changedSum > 15 || changedSum < 1) return;
        }
        else if (element.classList.contains('counter-long-time')) {
            if (changedSum > 60 || changedSum < 30) return;
        }

        if (element.classList.contains('counter-work-iteration')) {
            if (changedSum > 5 || changedSum < 1) return;
            modifiedElement.value = changedSum;
        }
        else {
            modifiedElement.value = changedSum + ' min';
        }
        modifiedElement.classList.add('changedData');
    }

    getWorkTime() {
        return this.workTime;
    }

    getWorkIterations() {
        return this.workIteration;
    }

    getShortBreak() {
        return this.shortBreak;
    }

    getLongBreak() {
        return this.longBreak;
    }

    countAllWidth() {
        let workIteration = this.getWorkTime() + this.getShortBreak();
        let totalWidth = (workIteration * this.getWorkIterations()) * 2 - (this.getShortBreak()) * 2 + this.getLongBreak();
        return totalWidth;
    }

    countWorkTime() {
        return (this.workTime / this.countAllWidth() * 100) + '%';
    }

    countLongBreak() {
        return (this.longBreak / this.countAllWidth()) * 100 + '%';
    }

    countShortBreak() {
        return (this.shortBreak / this.countAllWidth() * 100) + '%';
    }

    countFullCycleHours(elem) {
        let workIteration = this.workTime + this.shortBreak;
        let totalWidth = (workIteration * this.workIteration) - (this.shortBreak) + this.longBreak;
        let totalHours = parseInt(totalWidth / 60);
        let totalMinutes = parseInt(totalWidth % 60);
        cycleView.renderPartsCycleMinutes(elem, 'Full cycle: ', totalHours, 'h', totalMinutes, 'm');
        this.countPartsCycleHours();
    }

    countPartsCycleHours() {
        DOMElementsInitializer.timePoints.innerHTML = '';
        let totalTime = this.countAllWidth();
        let totalMinutes = 30;
        let totalHours = 0;
        if (window.innerWidth > 640) {
            for (let k = 0; k < totalTime / 30 - 1; k++) {
                let smallCycleTitle = cycleView.createCycleTitle();
                let wrapperCycleTitle = cycleView.createCycleWrapper();
                smallCycleTitle.classList.add('smallCycleTitleStyles');
                cycleView.renderPartsCycleMinutes(smallCycleTitle, totalHours, 'h', totalMinutes, 'm');
                wrapperCycleTitle.style.width = (30 / totalTime) * 100 + '%';
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
        }
        else {
            for (let k = 0; k < totalTime / 60 - 1; k++) {
                let smallCycleTitle = cycleView.createCycleTitle();
                let wrapperCycleTitle = cycleView.createCycleWrapper();
                totalHours++;
                cycleView.renderPartsCycleMinutes(smallCycleTitle, totalHours, 'h');
                wrapperCycleTitle.style.width = (60 / totalTime) * 100 + '%';
                cycleView.showPartsCycleHours(smallCycleTitle, wrapperCycleTitle);
            }
        }
    }

    subscribeOnCycle() {
        ElementsListener.listenToEvents('click', document.getElementsByClassName('increment'), function (event) {
            let target = event.target.parentNode;
            if (navigator.userAgent == 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0') {
                target = event.target;
            }
            event.stopPropagation();
            cycleController.changeCycleData(target);
        });

        ElementsListener.listenToEvents('click', document.getElementsByClassName('dicrement'), function (event) {
            let target = event.target.parentNode;
            if (navigator.userAgent == 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0') {
                target = event.target;
            }
            event.stopPropagation();
            cycleController.changeCycleData(target);
        });
        ElementsListener.listenToEvents('click', document.getElementsByClassName('save-cycle-btn'), CycleModel.createCycle);
        ElementsListener.listenToEvents('click', document.getElementsByClassName('next-btn'), function () {
            counterOfTasks = 0;
            TaskList.moveToTaskList();
        });
    }

}

let DOMElementsInitializer;
let cycleController = new CycleController();
