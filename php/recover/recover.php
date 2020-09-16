<?php
require_once "../conect.php";
require_once "../make_tab.php";
require_once "../mail.php";

//For checking, if do we have a data or not? And is it active or pending?
if ($_POST["action"] === "recover_head") {
    $rec_head = $_POST["rec_head_email"];
    $query = "SELECT *  FROM `cv_userdata` WHERE `email` = '$rec_head'";
    $result = $connection->query($query);
    if ($result->num_rows === 1) {
        $query = "SELECT *  FROM `cv_userdata` WHERE `email` = '$rec_head' AND `status` = 'active'";
        $result = $connection->query($query);
        if ($result->num_rows === 1) {
            echo ("active_data");
            $query = "SELECT `email`,`mail_gen` FROM `cv_userdata` WHERE `email` = '$rec_head'  ";
            $result = $connection->query($query);
            $array = $result->fetch_all();

            $em = $array[0][0];
            $gen_c = $array[0][1];

            mail_require($em, $gen_c);
        } else if ($result->num_rows === 0) {
            $query = "SELECT * FROM `cv_userdata` WHERE `email` = '$rec_head' AND `status` = 'pending'";
            $result = $connection->query($query);
            if ($result->num_rows === 1) {
                echo ("pending_data");
                $query = "SELECT `email`,`mail_gen` FROM `cv_userdata` WHERE `email` = '$rec_head'  ";
                $result = $connection->query($query);
                $array = $result->fetch_all();

                $em = $array[0][0];
                $gen_c = $array[0][1];

                mail_require($em, $gen_c);
            } else {
                echo ("Error");
            }
        }
    } else if ($result->num_rows === 0) {
        echo ("no_em");
    } else {
        echo ("Error");
    }
}

#Confirm

//Active data
if ($_POST["action"] === "act_recover") {
    $act_mail = $_POST["act_head_mail"];
    $act_verif = $_POST["act_verif"];
    $query = "SELECT * FROM `cv_userdata` WHERE `email` = '$act_mail' AND `mail_gen` = '$act_verif' AND `status` = 'active'";
    $result = $connection->query($query);
    if ($result->num_rows === 1) {
        echo ("act_yes");
    } else if ($result->num_rows === 0) {
        echo ("act_no");
    } else {
        echo ("Error");
    }
}



//Pending data
if ($_POST["action"] === "pend_recover") {
    $pend_mail = $_POST["pend_head_mail"];
    $pend_verif = $_POST["pend_verif"];
    $query = "SELECT * FROM `cv_userdata` WHERE `email` = '$pend_mail' AND `mail_gen` = '$pend_verif ' AND `status` = 'pending'";
    $result = $connection->query($query);
    if ($result->num_rows === 1) {
        echo ("pend_yes");
        $query = "UPDATE `cv_userdata` SET `status` = 'active' WHERE  `email` = '$pend_mail' AND `mail_gen` ='$pend_verif'";
        $connection->query($query);
    } else if ($result->num_rows === 0) {
        echo ("pend_no");
    } else {
        echo ("Error");
    }
}

#SEND MESSEGE AGAIN

//Active data...send messege again
if ($_POST["action"] === "send_REC_act") {
    $mail_send_again_rec_act = $_POST['send_c_rec_act'];
    $query = "SELECT `email`,`mail_gen` FROM `cv_userdata` WHERE `email` = '$mail_send_again_rec_act' ";
    $result = $connection->query($query);
    $array = $result->fetch_all();

    if ($result->num_rows === 1) {
        $em = $array[0][0];
        $gen_c = $array[0][1];
        echo ("act_send_yes");
        mail_require($em, $gen_c);
    } else if ($result->num_rows === 0) {
        echo ("act_send_no");
    } else {
        echo ("Error");
    }
}

//Pending data...send messege again
if ($_POST["action"] === "send_REC_pend") {
    $mail_send_again_rec_pend = $_POST['send_c_rec_pend'];
    $query = "SELECT `email`,`mail_gen` FROM `cv_userdata` WHERE `email` = '$mail_send_again_rec_pend' ";
    $result = $connection->query($query);
    $array = $result->fetch_all();

    if ($result->num_rows === 1) {
        $em = $array[0][0];
        $gen_c = $array[0][1];
        echo ("pend_send_yes");
        mail_require($em, $gen_c);
    } else if ($result->num_rows === 0) {
        echo ("pend_send_no");
    } else {
        echo ("Error");
    }
}

#FINAL PART

//Final part
if ($_POST['action'] === "recover_final") {
    $rec_email_final = $_POST["rec_email_final"];
    $rec_password_final = $_POST["rec_password_final"];
    $query = "SELECT * FROM `cv_userdata` WHERE `email` = '$rec_email_final' AND `status` = 'active' AND `password` = '$rec_password_final'";
    $result = $connection->query($query);
    if ($result->num_rows === 1) {
        echo ("no_new_pass");
    } else if ($result->num_rows === 0) {
        $query = "SELECT * FROM `cv_userdata` WHERE `email` = '$rec_email_final' AND `status` = 'active' ";
        $result = $connection->query($query);
        if ($result->num_rows === 1) {
            echo ("sful_change");
            $query = "UPDATE `cv_userdata` SET `password` = '$rec_password_final' WHERE `email` = '$rec_email_final' AND  `status` = 'active'";
            $connection->query($query);
        } else if ($result->num_rows === 0) {
            $query = "SELECT * FROM `cv_userdata` WHERE `email` = '$rec_email_final' AND `status` = 'pending' ";
            $result = $connection->query($query);
            if ($result->num_rows === 1) {
                echo ("rec_no");
            } else {
                echo ("acc_not");
            }
        }
    } else {
        echo ("Error");
    }
}
