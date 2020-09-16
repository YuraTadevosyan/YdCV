<?php

session_start();
require_once "../conect.php";
require_once "../make_tab.php";
require_once "../mail.php";


$n = 10;
$name = $_POST['name'];
$email = $_POST['email'];
$gen_code = bin2hex(random_bytes($n));
$pass = $_POST['password'];
$def_img = '../img/users/def.jpg';

if ($_POST['action'] === "sign-up") {
    $query = "SELECT * FROM `cv_userdata` WHERE `email` = '$email' ";
    $result = $connection->query($query);
    if ($result->num_rows == 0) {
        $reg = "INSERT INTO `cv_userdata`( `name`, `email`,`mail_gen`, `password`,`image`)
                    VALUES ('$name','$email','$gen_code', '$pass','$def_img')";
        $connection->query($reg);

        echo ("acc_yes");

        $gen = "SELECT `email`,`mail_gen`,`image` FROM `cv_userdata` WHERE `email` = '$email'";
        $res = $connection->query($gen);
        $arr = $res->fetch_all();

        $_SESSION["mail"] = $arr[0][0];
        $_SESSION["gen"] = $arr[0][1];
        $_SESSION["image"] = $arr[0][2];
        mail_require($em, $gen_code);
    } else {
        echo ("acc_no");
    }
} else if ($_POST["action"] == "v_check_SUP") {
    $hash = $_POST["hash_checker"];
    $check_mail = $_POST["mail_SUP"];
    $query = "SELECT `mail_gen` FROM `cv_userdata` WHERE  `email` ='$check_mail' AND  `mail_gen` = '$hash'";
    $result = $connection->query($query);
    if ($result->num_rows === 1) {
        $query = "UPDATE `cv_userdata` SET `status` = 'active' WHERE `mail_gen` = '$hash' AND `email` = '$check_mail' ";
        $connection->query($query);
        echo ("sful_con"); //Succesfully conect
    } else {
        echo ("no_con"); //No connect
    }
} else if ($_POST["action"] === "send_SUP") {
    //  $email = $_SESSION["mail"];
    // $gen_code = $_SESSION["gen"];
    $mail_send_again = $_POST['send_c'];
    $query = "SELECT `email`,`mail_gen` FROM `cv_userdata` WHERE `email` = '$mail_send_again' ";
    $result = $connection->query($query);
    $array = $result->fetch_all();

    // $em = $array[0][0];
    // $gen_c = $array[0][1];
    if ($result->num_rows === 1) {
        $em = $array[0][0];
        $gen_c = $array[0][1];
        echo ("yes_connect");
        mail_require($em, $gen_c);
    } else if ($result->num_rows === 0) {
        echo ("no_connect");
    } else {
        echo ("Error");
    }
}
