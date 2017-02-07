function RUN_AJAX() {
    $.ajax({
        url: "http://rest-service.guides.spring.io/greeting",
        dataType: "json",
        success: function (data) {
            $('.greeting-id').append(data.id);
            $('.greeting-content').append(data.content);

            init_chart('piechart');
        }
    })
}

function init_chart(DIV){
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['ERTMS', 5],
            ['TMS', 3],
            ['AUX', 9],
            ['IXL CUBICLE', 7],
            ['TRAIN DETECTION', 17],
            ['TRACKSIDE EQ', 59]
        ]);

        var options = {
            title: 'Life cycle cost',
            pieHole: 0.4
        };

        var chart = new google.visualization.PieChart(document.getElementById(DIV));

        chart.draw(data, options);
    }
}