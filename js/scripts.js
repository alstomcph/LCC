function RUN_AJAX() {
    $.ajax({
        url: "http://rest-service.guides.spring.io/greeting",
        dataType: "json",
        success: function (data) {
            init_chart('chart');
        }
    })
}

function init_chart(inDiv) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        data = google.visualization.arrayToDataTable([
            ['Genre', 'Total Discard Cost', 'Total MMHACM Cost', 'Total Repair Cost', 'Total  Renewal Cost', 'Total MMHAPM Cost', { role: 'annotation' }],
            ['Trackside Equipment', 10, 24, 20, 32, 18, ''],
            ['ATC (Trackside)', 16, 22, 23, 30, 16, ''],
            ['TCC TMS', 28, 19, 29, 30, 12, ''],
            ['Train Position, Detection & Integrity', 16, 22, 23, 30, 16, ''],
            ['IXL', 16, 22, 23, 30, 16, '']
        ]);

        var options = {
            title: 'Total maintenance Cost (k€/year)',
            width: '100%',
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,
            //animation: {startup: true, duration: 400, easing: 'inAndOut'},
            //colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
        };

        chart = new google.visualization.ColumnChart(document.getElementById(inDiv));
        google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(data, options);
    }
}
function selectHandler() {
    var selection = chart.getSelection();
    var message = '';
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.row != null && item.column != null) {
            var str = data.getFormattedValue(item.row, item.column);
            var category = data
                .getValue(chart.getSelection()[0].row, 0)
            var type
            if (item.column == 1) {
                type = "sale";
            } else if (item.column == 2) {
                type = "Expense";
            } else {
                type = "Profit";
            }
            message += '{row:' + item.row + ',column:' + item.column
                + '} = ' + str + '  The Category is:' + category
                + ' it belongs to : ' + type + '\n';
        } else if (item.row != null) {
            var str = data.getFormattedValue(item.row, 0);
            message += '{row:' + item.row
                + ', column:none}; value (col 0) = ' + str
                + '  The Category is:' + category + '\n';
        } else if (item.column != null) {
            var str = data.getFormattedValue(0, item.column);
            message += '{row:none, column:' + item.column
                + '}; value (row 0) = ' + str
                + '  The Category is:' + category + '\n';
        }
    }
    if (message == '') {
        message = 'nothing';
    }
    alert('You selected ' + message);
}
