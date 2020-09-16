<?php

session_start();
require_once "../conect.php";
require_once "../make_tab.php";
require_once "../mail.php";

$password2 = $_POST['password2'];
$email2 = $_POST['email2'];

if ($_POST['action'] === "sign-in") {
    $query2 = "SELECT * FROM `cv_userdata` WHERE `email` = '$email2' AND `password` = '$password2' AND `status` = 'active' ";
    $result2 = $connection->query($query2);
    if ($result2->num_rows === 1) {
        // $query2 = "SELECT `name`,`image` FROM `cv_userdata` WHERE `email` = '$email2' AND `password` = '$password2'";
        // $result2 = $connection->query($query2);

        // $arr = $result2->fetch_all();

        // $_SESSION["name"] = $arr[0][0];
        // $_SESSION["image"] = $arr[0][1];

        echo ("Welcome");
    } else if ($result2->num_rows === 0) {
        $query3 = "SELECT * FROM `cv_userdata` WHERE `email` = '$email2' AND `password` = '$password2' AND `status` = 'pending' ";
        $result3 = $connection->query($query3);
        if ($result3->num_rows === 1) {
            // $query4 = "SELECT `email`,`mail_gen` FROM `cv_userdata` WHERE `email` = '$email2' AND `password` = '$password2'";
            // $result4 = $connection->query($query4);

            // $arr2 = $result4->fetch_all();

            // $_SESSION["email"] = $arr[0][0];
            // $_SESSION["genc"] = $arr[0][1];
            echo "Please activate";
        } else if ($result3->num_rows === 0) {
            echo ("Account with this email isn't registered");
        }
    }
} else if ($_POST["action"] == "v_check_SIN") {
    $hash = $_POST["hash_checker"];
    $check_mail2 = $_POST["mail_SIN"];
    $query = "SELECT `mail_gen` FROM `cv_userdata` WHERE `mail_gen` = '$hash'  AND `email` ='$check_mail2'  ";
    $result = $connection->query($query);
    if ($result->num_rows === 1) {
        $query = "UPDATE `cv_userdata` SET `status` = 'active' WHERE `mail_gen` = '$hash'  AND `email` ='$check_mail2'  "; // uxxel ...maili stugumov
        $connection->query($query);
        echo ("s_con"); //Succesfully conect
    } else {
        echo ("n_con"); //No connect
    }
} else if ($_POST["action"] === "send_SIN") {
    //  $email = $_SESSION["mail"];
    // $gen_code = $_SESSION["gen"];
    $send_again = $_POST['send_code'];
    $query = "SELECT `email`,`mail_gen` FROM `cv_userdata` WHERE `email` = '$send_again' ";
    $result = $connection->query($query);
    $array = $result->fetch_all();

    // $em = $array[0][0];
    // $gen_c = $array[0][1];
    if ($result->num_rows === 1) {
        $em = $array[0][0];
        $gen_c = $array[0][1];
        echo ("y_connect");
        mail_require($em, $gen_c);
    } else if ($result->num_rows === 0) {
        echo ("n_connect");
    } else {
        echo ("Error");
    }
}
