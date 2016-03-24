<?php

$dbhost="166.62.8.47";
$dbuser="auxstudDB1";
$dbpass="auxstud3DB1!";
$dbname="auxstudDB1";
$connection=mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);


if ($connection->connect_error) { die("Connection failed: " . $connection->connect_error); };
mysqli_select_db($connection, "auxstudDB1") or die('Could not select database'); // Test if date is available

$query = 'INSERT INTO `tlb_ship_36` (full , addr, city,zip , phone) VALUES(\''.$_POST["full"].'\', \''.$_POST["addr"].'\', \''.$_POST["city"].'\', \''.$_POST["zip"].'\', \''.$_POST["phone"].'\')'; 

$result = mysql_query($query) or die('Query failed: ' . mysql_error());
echo $result;
echo "Success!!!!!!!!!!";
?>