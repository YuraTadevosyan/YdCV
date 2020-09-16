<?php
require_once "../conect.php";
require_once "../make_tab.php";
require_once "../phpmailer/PHPMailerAutoload.php";


function mail_require($user_mail, $messege)
{
    $mail = new PHPMailer();
    $mail->CharSet = 'utf-8';
    $mail->isSMTP();
    $mail->Host = 'smtp.mail.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'tadevosyan_yura@mail.ru';
    $mail->Password = 'yuratadevosyan777';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom("tadevosyan_yura@mail.ru", 'Darte Veider');
    // $mail->addAddress("$user_mail");
    $mail->addAddress("tadevosyan_yura@mail.ru");
    $mail->isHTML(true);
    $mail->Subject = 'Your verification code';
    $mail->Body = "$messege";
    // sleep(10);
    if (!$mail->Send()) {
        die;
    }
}
