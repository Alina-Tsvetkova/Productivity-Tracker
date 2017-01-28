class Cycle {
    constructor(workTime, workIteration, shortBreak, longBreak) {
        this.workTime = +workTime;
        this.workIteration = +workIteration;
        this.shortBreak = +shortBreak;
        this.longBreak = +longBreak;
    }

    renderSavedCycleSettings() {
        let userId = localStorage.getItem('currentUser');
        let i = 0;
        let cycleReceiver = firebase.database().ref('users/' + userId + '/cycle');
        cycleReceiver.on('value', function (data) {
            document.getElementsByClassName('counter-long-time')[0].value = data.val().longBreak + " min";
            document.getElementsByClassName('counter-short-break')[0].value = data.val().shortBreak + " min";
            document.getElementsByClassName('counter-work-iteration')[0].value = data.val().workIteration;
            document.getElementsByClassName('counter-work-time')[0].value = data.val().workTime + " min";
            myCycle.getDataForCycle();
        });

    }

    getDataForCycle() { // this function is needful to transfer data from document inputs to cycle object
        this.workTime = parseInt(document.getElementsByClassName('counter-work-time')[0].value);
        this.workIteration = parseInt(document.getElementsByClassName('counter-work-iteration')[0].value);
        this.shortBreak = parseInt(document.getElementsByClassName('counter-short-break')[0].value);
        this.longBreak = parseInt(document.getElementsByClassName('counter-long-time')[0].value);
        this.createWorkTime();
    }

    changeCycleData(target) {
        let element = DOMElementsInitializer.counters[DOMElementsInitializer.buttonsArr.indexOf(target)];
        if (target.classList.contains('dicrement')) {
            element = DOMElementsInitializer.counters[DOMElementsInitializer.buttonsArr.indexOf(target) % 4];
        }
        let modifiedElement = target.parentNode.getElementsByClassName('field')[0];
        let regTakeInt = /[0-9]+/g;
        let changedSum = element.value;
        changedSum = parseInt(changedSum.match(regTakeInt));

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
        this.getDataForCycle();
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
        elem.innerHTML = 'Full cycle: ' + totalHours + 'h ' + totalMinutes + 'm';
        this.countPartsCycleHours();
    }

    countPartsCycleHours(elem) {
        DOMElementsInitializer.timePoints.innerHTML = '';
        let totalTime = this.countAllWidth();
        let totalMinutes = 30;
        let totalHours = 0;
        if (window.innerWidth > 640) {
            for (let k = 0; k < totalTime / 30 - 1; k++) {
                let wrapperCycleTitle = document.createElement('div');
                wrapperCycleTitle.classList.add('wrapperCycleTitleStyles');
                let smallCycleTitle = document.createElement('span');
                smallCycleTitle.classList.add('smallCycleTitleStyles');
                smallCycleTitle.innerHTML = totalHours + 'h ' + totalMinutes + 'm';
                wrapperCycleTitle.style.width = (30 / totalTime) * 100 + '%';
                if (totalHours == 0) {
                    smallCycleTitle.innerHTML = totalMinutes + 'm';
                }
                if (totalMinutes % 60 == 0) {
                    totalHours += 1;
                    totalMinutes -= 60;
                    smallCycleTitle.innerHTML = totalHours + 'h' + totalMinutes + 'm';
                }
                if (totalMinutes == 0) {
                    smallCycleTitle.innerHTML = totalHours + 'h';
                }
                totalMinutes += 30;
                this.showPartsCycleHours(smallCycleTitle, wrapperCycleTitle);
            }
        }
        else {
            for (let k = 0; k < totalTime / 60 - 1; k++) {
                let wrapperCycleTitle = document.createElement('div');
                wrapperCycleTitle.classList.add('wrapperCycleTitleStyles');
                let smallCycleTitle = document.createElement('span');
                smallCycleTitle.classList.add('smallCycleTitleStyles');
                totalHours++;
                smallCycleTitle.innerHTML = totalHours + 'h';
                wrapperCycleTitle.style.width = (60 / totalTime) * 100 + '%';
                this.showPartsCycleHours(smallCycleTitle, wrapperCycleTitle);
            }
        }
    }

    createWorkTime() {
        DOMElementsInitializer.cycle.innerHTML = '';
        this.generateWorkAndBreakIt();
        this.generateLongBreak();
        this.showFullCycle();
        this.generateWorkAndBreakIt();
    }

    generateWorkAndBreakIt() {
        for (let k = 0; k < this.getWorkIterations(); k++) {
            let workPart = document.createElement('div');
            workPart.classList.add('workPartsStyles');
            workPart.style.width = this.countWorkTime();
            DOMElementsInitializer.cycle.appendChild(workPart);
            if (k < this.getWorkIterations() - 1) { // no need to have break after last work time
                this.generateShortBreak();
            }
        }
    }

    generateLongBreak() {
        let longBreak = document.createElement('div');
        longBreak.classList.add('longBreakStyles');
        longBreak.style.width = this.countLongBreak();
        DOMElementsInitializer.cycle.appendChild(longBreak);
    }

    generateShortBreak() {
        let shortBreakPart = document.createElement('div');
        shortBreakPart.classList.add('breakPartsStyles');
        shortBreakPart.style.width = this.countShortBreak();
        DOMElementsInitializer.cycle.appendChild(shortBreakPart);
    }

    showFullCycle() {
        let fullCycleTitle = document.createElement('span');
        fullCycleTitle.classList.add('fullCycleTitleStyles');
        this.countFullCycleHours(fullCycleTitle);
        DOMElementsInitializer.cycle.appendChild(fullCycleTitle);
    }

    showPartsCycleHours(elem, mainElem) {
        mainElem.appendChild(elem);
        DOMElementsInitializer.timePoints.appendChild(mainElem);
    }

}

let DOMElementsInitializer;
let myCycle = new Cycle();
