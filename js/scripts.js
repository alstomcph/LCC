function RUN_AJAX() {
    $.ajax({
        url: "http://rest-service.guides.spring.io/greeting",
        dataType: "json",
        success: function (data) {
            //$('.greeting-id').append(data.id);
            //$('.greeting-content').append(data.content);
            init_chart('piechart');
        }
    })
}

function init_chart(inDiv){
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Trackside Equipment', 5],
            ['ATC (Trackside)', 3],
            ['TCC TMS', 9],
            ['Train Position, Detection & Integrity', 7],
            ['IXL', 17]
        ]);

        var options = {
            title: 'Life cycle cost',
            pieHole: 0.4,
            width: 600,
            height: 400
        };

        var chart = new google.visualization.PieChart(document.getElementById(inDiv));
        chart.draw(data, options);
    }
}