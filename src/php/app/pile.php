<?php

$note = $_POST['note'];
$mysqli = new mysqli("127.0.0.1", "root", "", "Note");
$mysqli->query("INSERT INTO note (content) VALUES ('$note')");
$mysqli->close();

?>
