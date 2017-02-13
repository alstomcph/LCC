<!DOCTYPE html>
<html>
    <head>
        <title>Life Cycle Cost</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
		<link rel="stylesheet" href="css/milligram.min.css">
        <link rel="stylesheet" href="css/overwrite.css">
        <script src="js/jquery.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="js/scripts.js"></script>
        <script src="js/table_events.js"></script>
    </head>

    <body>
        <div>
            <img src="images/alstom.png" style="height:15px">
            <h1>Life cycle cost | v0.1.3</h1>
            <button type="button" ID="AJAX_button" onclick="RUN_AJAX()">Run SAP Query</button>
            <div id="chart"></div>
            <div>
                <?php
                    $servername = "localhost";
                    $username = "readonly";
                    $password = "readonly";
                    $dbname = "lcc";
                    $query = "SELECT * FROM const";

                    $connection = mysqli_connect($servername, $username, $password, $dbname);
                    if(mysqli_connect_errno()){
                        die("connection failed: ".mysqli_connect_error()." (" . mysqli_connect_error().")");
                    }
                    if($result = mysqli_query($connection, $query)){
                        $all_property = array();
                        echo '<table class="data-table"><thead><tr>';
                        while ($property = mysqli_fetch_field($result)) {
                            echo '<th>' . $property->name . '</th>';
                            array_push($all_property, $property->name);
                        }
                        echo '</tr></thead><tbody>';
                        while ($row = mysqli_fetch_array($result)) {
                            echo "<tr>";
                            foreach ($all_property as $item) {
                                echo '<td contenteditable="true">' . $row[$item] . '</td>';
                            }
                            echo '</tr>';
                        }
                        echo "</tbody></table>";
                    }
                    else{
                        echo "error";
                    }
                    $connection->close();
                ?>
            </div>
        </div>
    </body>
</html>
