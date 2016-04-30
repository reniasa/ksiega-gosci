<?php

$latestId = $_POST['latestId'];
$mysqli = new mysqli("127.0.0.1", "root", "", "Note");
$result = $mysqli->query("SELECT id, content FROM note WHERE id > $latestId");
$notes = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($notes, $row);
    }
}
$mysqli->close();
echo json_encode($notes);
?>
