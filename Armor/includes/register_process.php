<?php

$dbhost="166.62.8.47";
$dbuser="auxstudDB1";
$dbpass="auxstud3DB1!";
$dbname="auxstudDB1";
$connection=mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);


if ($connection->connect_error) { die("Connection failed: " . $connection->connect_error); };
mysqli_select_db($connection, "auxstudDB1") or die('Could not select database'); // Test if date is available

$query = 'INSERT INTO `tbl_users_36` (first , last, uname,password , email) VALUES(\''.$_POST["first"].'\', \''.$_POST["last"].'\', \''.$_POST["uname"].'\', \''.$_POST["password"].'\', \''.$_POST["email"].'\')'; 

$result = mysql_query($query) or die('Query failed: ' . mysql_error());
echo $result;
echo "Success!!!!!!!!!!";
?>