class Reports {
    receiveReportsStatistics() {
        monthChartData.initializeMonthCounter();
        monthChartData.generateReportsData();
        monthChartData.receiveReportsData();
    }

    static downloadReports() {
        Router.addHash("reports");
        let reportsBinder = new Binder('app/components/reports/reports.html');
        let reportsDoc = reportsBinder.downloadComponent();
        document.body.innerHTML = '';
        document.body.appendChild(reportsDoc.getElementById('wrapper'));
        Icons.downloadMainIcons();
        reports.receiveReportsStatistics();
        reports.downloadDayChart();
        let tooltips = $('.tooltip');
        tooltips.tooltipSwitcher();
        Icons.iconLinksBinder();
        dayReportController.deleteDayReportInfo(dayChartData);

        document.getElementsByClassName('week-chart-visualizer')[0].addEventListener('click', reports.downloadWeekChart);
        document.getElementsByClassName('day-chart-visualizer')[0].addEventListener('click', reports.downloadDayChart);
        document.getElementsByClassName('month-chart-visualizer')[0].addEventListener('click', reports.downloadMonthChart);

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

    downloadWeekChart(){
        let reportsElements = reports.initializeReportsObject;
        reportsElements.chartContainer.id = 'container-week-report';
        weekChartData.transferDataToWeekChart();
        Reports.createWeekOrMonthChart(weekChartData);
        dayReportController.deleteDayReportInfo(dayChartData);
    }

    downloadDayChart(){
        let reportsElements = reports.initializeReportsObject;
        reportsElements.chartContainer.id = 'container-day-report';
        Reports.changeGapColor(reportsElements.gapVariants[0]);
        dayReportModel.transferDataToDayChart(dayChartData);
        dayReportView.createDayChart(dayChartData);
        dayReportController.deleteDayReportInfo(dayChartData);
    }

    downloadMonthChart(){
        let reportsElements = reports.initializeReportsObject;
        reportsElements.chartContainer.id = 'container-month-report';
        Reports.createWeekOrMonthChart(monthChartData);
        dayReportController.deleteDayReportInfo(dayChartData);
    }

    static changeGapColor(target) { // change color of selected tab (gap)
        let reportsElements = reports.initializeReportsObject;
        for (let i = 0; i < reportsElements.gapVariants.length; i++) {
            reportsElements.gapVariants[i].classList.remove('selectedTab');
        }
        target.classList.add("selectedTab");
    }


    static createWeekOrMonthChart(chartObj) {
        Highcharts.chart(chartObj.id, {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                lineColor: 'blue',
                borderColor: 'white',
                spacingBottom: 65
            },

            credits: {
                enabled: false
            },

            exporting: {
                enabled: false
            },
            title: {
                text: ''
            },

            legend: {
                itemMarginTop: 30,
                itemStyle: {
                    color: '#8da5b8',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: '\'Roboto\', sans-serif',
                },
                itemHoverStyle: {
                    color: 'white'
                },
                symbolRadius: 0
            },

            xAxis: {
                categories: chartObj.chartCategories,
                labels: {
                    style: {
                        color: 'white',
                        fontFamily: '\'Roboto\', sans-serif',
                    }
                },
                lineWidth: 1,
                lineColor: 'white',
                tickColor: 'transparent',
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                gridLineColor: '#345168',
                color: 'white',
                title: {
                    text: ''
                },
                lineWidth: 1,
                lineColor: 'white',
                labels: {
                    style: {
                        color: 'white',
                        fontFamily: '\'Roboto\', sans-serif',
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return this.series.name.toUpperCase() + '<br/>' +
                        'Tasks: ' + this.point.y;
                },
                borderColor: 'none',
                opacity: 0.7,
                useHTML: true,
                backgroundColor: "#cddde9",
                style: {
                    "color": '#3c5162',
                    "fontSize": "14px",
                    "fontWeight": 'bold',
                    "fontFamily": '\'Roboto-Bold\', sans-serif',
                },
            },

            plotOptions: {
                column: {
                    pointPadding: 0,
                    pointWidth: chartObj.columnWidth,
                    borderWidth: 0,
                    stacking: 'normal',
                }
            },
            colors: ['#f15a4a', '#fea741', '#fddc43', '#1abb9b', '#8da5b8'],
            series: chartObj.chartData,
        });
    }

}


// /* two methods weekChartData.transferDataToWeekChart and dayChartData.transferDataToDayChart below are created to fill week and day data according to the month data
//  (because when we want to see day chart we wait to see last day of our month and when we want to see week chart
//  we wait to see last working week (that is why last 5 days of the month) of our month
//  */

let reports = new Reports();