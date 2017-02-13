class Reports {
    receiveReportsStatistics() {
        monthChartData.initializeMonthCounter();
        weekMonthReportModel.generateReportsData();
        weekMonthReportModel.receiveReportsData();
    }

    static downloadReports() {
        weekMonthReportModel.clearReportsBeforeFill();
        reports.receiveReportsStatistics();
        Router.addHash("reports");
        let reportsBinder = new Binder('app/components/reports/reports.html');
        let reportsDoc = reportsBinder.downloadComponent();
        document.body.innerHTML = '';
        document.body.appendChild(reportsDoc.getElementById('wrapper'));
        Icons.downloadMainIcons();
        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
        Icons.iconLinksBinder();
        reports.subscribeReportsEvents();
        setTimeout(function () {
            reports.downloadDayChart();
        },200)
    }

    get initializeReportsObject() {
        return { // needful elements to manipulate with DOCUMENT
            gapVariantsContainer: document.getElementsByClassName('gap-variants')[0],
            gapVariants: document.getElementsByClassName('gap-variant'),
            chartContainer: document.querySelector('.charts'),
            noDataNotification: document.getElementsByClassName('no-reports-info-wrapper')[0]
        };
    }

    removeReportsContainers() { // if no data for reports
        let reportsElements = reports.initializeReportsObject;
        try {
            reportsElements.chartContainer.classList.add('non-visible-elem');
            reportsElements.gapVariants[0].classList.add('non-visible-elem');
            reportsElements.noDataNotification.style.display = 'block';
        } catch (e) {
            return "element is already removed";
        }
    }

    downloadWeekChart() {
        reports.addId('container-week-report', 1);
        weekChartData.transferDataToWeekChart();
        weekMonthReportView.createWeekOrMonthChart(weekChartData);
    }

    downloadDayChart() {
        reports.addId('container-day-report', 0);
        dayReportModel.transferDataToDayChart(dayChartData);
        dayReportView.createDayChart(dayChartData);
    }

    downloadMonthChart() {
        reports.addId('container-month-report', 2);
        weekMonthReportView.createWeekOrMonthChart(monthChartData);
    }

    addId(reportsId, count) {
        let reportsElements = reports.initializeReportsObject;
        reportsElements.chartContainer.id = reportsId;
        Reports.changeGapColor(reportsElements.gapVariants[count]);
        dayReportController.deleteDayReportInfo(dayChartData);
    }

    subscribeReportsEvents() {
        document.getElementsByClassName('week-chart-visualizer')[0].addEventListener('click', reports.downloadWeekChart);
        document.getElementsByClassName('day-chart-visualizer')[0].addEventListener('click', reports.downloadDayChart);
        document.getElementsByClassName('month-chart-visualizer')[0].addEventListener('click', reports.downloadMonthChart);
    }

    static changeGapColor(target) { // change color of selected tab (gap)
        let reportsElements = reports.initializeReportsObject;
        for (let i = 0; i < reportsElements.gapVariants.length; i++) {
            reportsElements.gapVariants[i].classList.remove('selectedTab');
        }
        target.classList.add("selectedTab");
    }
}


// /* two methods weekChartData.transferDataToWeekChart and dayChartData.transferDataToDayChart below are created to fill week and day data according to the month data
//  (because when we want to see day chart we wait to see last day of our month and when we want to see week chart
//  we wait to see last working week (that is why last 5 days of the month) of our month
//  */

let reports = new Reports();
