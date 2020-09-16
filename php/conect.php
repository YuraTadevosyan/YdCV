<?php
$servername = "localhost";
$username = "root";
$password = "root";
$connection = new mysqli($servername, $username, $password);

$query = "USE ydcv";
$connection->query($query);
