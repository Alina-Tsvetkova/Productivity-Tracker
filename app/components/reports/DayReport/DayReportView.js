class DayReportView {
    createDayChart(dayObjReport) {
        dayReportView.removeLegendThatIsAbsent(dayObjReport);
        Highcharts.chart('container-day-report', {
            chart: {
                plotBackgroundColor: null,
                type: 'pie',
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: 'transparent'
            },

            credits: {
                enabled: false
            },

            exporting: {
                enabled: false
            },

            title: {
                text: dayObjReport.tasksQuantity,
                align: 'center',
                verticalAlign: 'middle',
                y: 15,
                style: {
                    color: 'white',
                    fontFamily: 'Roboto-Regular, sans-serif',
                    fontWeight: 'normal',
                    fontSize: '70px'
                }
            },

            subtitle: {
                text: 'total',
                align: 'center',
                verticalAlign: 'middle',
                y: 50,
                style: {
                    color: 'white',
                    fontFamily: 'Roboto-Regular, sans-serif',
                    fontWeight: 'normal',
                    fontSize: '20px'
                }
            },
            tooltip: {

                formatter: function () {
                    return this.point.name.toUpperCase() + '<br/>' +
                        'Tasks: ' + this.point.y;
                },
                useHTML: true,
                borderColor: 'none',
                opacity: 0.7,
                padding: 5,
                backgroundColor: "#cddde9",
                style: {
                    "color": '#3c5162',
                    "fontSize": "14px",
                    "fontWeight": 'bold',
                    "fontFamily": '\'Roboto-Bold\', sans-serif',
                },
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -40,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: false,
                            fontSize: '16px',
                            borderColor: 'none',
                            fontFamily: '\'PT Sans\', sans-serif',
                        }
                    },
                    showInLegend: true,
                },
                series: {
                    states: {
                        hover: {
                            halo: {
                                attributes: {
                                    fill: '#fff'
                                },
                                opacity: '.9'
                            }
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },

            colors: ['#f15a4a', '#fea741', '#fddc43', '#1abb9b', '#8da5b8'],
            series: [{
                innerSize: '50%',
                data: dayObjReport.chartData,
            }],
        });
    }

    removeLegendThatIsAbsent(dayObjReport) {
        for (let key of dayObjReport.chartData) {
            for (let x in key) {
                if (key[x] == 0) {
                    key.name = '';
                }
            }
        }
    }
}

let dayReportView = new DayReportView();