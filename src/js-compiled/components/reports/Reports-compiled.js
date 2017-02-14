'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reports = function () {
    function Reports() {
        _classCallCheck(this, Reports);
    }

    _createClass(Reports, [{
        key: 'receiveReportsStatistics',
        value: function receiveReportsStatistics() {
            monthChartData.initializeMonthCounter();
            weekMonthReportModel.generateReportsData();
            weekMonthReportModel.receiveReportsData();
        }
    }, {
        key: 'removeReportsContainers',
        value: function removeReportsContainers() {
            // if no data for reports
            var reportsElements = reports.initializeReportsObject;
            try {
                reportsElements.chartContainer.classList.add('non-visible-elem');
                reportsElements.gapVariants[0].classList.add('non-visible-elem');
                reportsElements.noDataNotification.style.display = 'block';
            } catch (e) {
                return "element is already removed";
            }
        }
    }, {
        key: 'downloadWeekChart',
        value: function downloadWeekChart() {
            reports.addId('container-week-report', 1);
            weekChartData.transferDataToWeekChart();
            weekMonthReportView.createWeekOrMonthChart(weekChartData);
        }
    }, {
        key: 'downloadDayChart',
        value: function downloadDayChart() {
            reports.addId('container-day-report', 0);
            dayReportModel.transferDataToDayChart(dayChartData);
            dayReportView.createDayChart(dayChartData);
        }
    }, {
        key: 'downloadMonthChart',
        value: function downloadMonthChart() {
            reports.addId('container-month-report', 2);
            weekMonthReportView.createWeekOrMonthChart(monthChartData);
        }
    }, {
        key: 'addId',
        value: function addId(reportsId, count) {
            var reportsElements = reports.initializeReportsObject;
            reportsElements.chartContainer.id = reportsId;
            Reports.changeGapColor(reportsElements.gapVariants[count]);
            dayReportController.deleteDayReportInfo(dayChartData);
        }
    }, {
        key: 'subscribeReportsEvents',
        value: function subscribeReportsEvents() {
            document.getElementsByClassName('week-chart-visualizer')[0].addEventListener('click', reports.downloadWeekChart);
            document.getElementsByClassName('day-chart-visualizer')[0].addEventListener('click', reports.downloadDayChart);
            document.getElementsByClassName('month-chart-visualizer')[0].addEventListener('click', reports.downloadMonthChart);
        }
    }, {
        key: 'initializeReportsObject',
        get: function get() {
            return { // needful elements to manipulate with DOCUMENT
                gapVariantsContainer: document.getElementsByClassName('gap-variants')[0],
                gapVariants: document.getElementsByClassName('gap-variant'),
                chartContainer: document.querySelector('.charts'),
                noDataNotification: document.getElementsByClassName('no-reports-info-wrapper')[0]
            };
        }
    }], [{
        key: 'downloadReports',
        value: function downloadReports() {
            weekMonthReportModel.clearReportsBeforeFill();
            reports.receiveReportsStatistics();
            Router.addHash("reports");
            var reportsBinder = new Binder('app/components/reports/reports.html');
            var reportsDoc = reportsBinder.downloadComponent();
            document.body.innerHTML = '';
            document.body.appendChild(reportsDoc.getElementById('wrapper'));
            Icons.downloadMainIcons();
            var tooltips = $('.tooltip');
            tooltips.tooltipSwitcher();
            Icons.iconLinksBinder();
            reports.subscribeReportsEvents();
            setTimeout(function () {
                reports.downloadDayChart();
            }, 200);
        }
    }, {
        key: 'changeGapColor',
        value: function changeGapColor(target) {
            // change color of selected tab (gap)
            var reportsElements = reports.initializeReportsObject;
            for (var i = 0; i < reportsElements.gapVariants.length; i++) {
                reportsElements.gapVariants[i].classList.remove('selectedTab');
            }
            target.classList.add("selectedTab");
        }
    }]);

    return Reports;
}();

// /* two methods weekChartData.transferDataToWeekChart and dayChartData.transferDataToDayChart below are created to fill week and day data according to the month data
//  (because when we want to see day chart we wait to see last day of our month and when we want to see week chart
//  we wait to see last working week (that is why last 5 days of the month) of our month
//  */

var reports = new Reports();
//# sourceMappingURL=Reports-compiled.js.map
