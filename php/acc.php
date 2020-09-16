<?php session_start() ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Your account</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/acc.css">
    <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../css/media.css">
    <link rel="stylesheet" type="text/css" href="../libs/fontawesome/all.min.css">

    <!-- Font Icon -->
    <link rel="stylesheet" href="../fonts/material-icon/css/material-design-iconic-font.min.css">

    <!--Jquery-->
    <script src="../js/jquery.js"></script>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.js"></script>
</head>

<body>
    <div class="container ">
        <nav class="navbar navbar-expand-lg navbar-light bg-white  ">
            <a class="navbar-brand" href="index.html">YdCv <i class="fas fa-file-alt"></i></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end " id="navbarNavAltMarkup">
                <div class="navbar-nav my-nav ">
                    <a class="nav-item nav-link active" href="index.html">Home <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="template.html">Template</a>
                    <a class="btn btn-outline-primary" href="#" id="sign_view">Log out</a>
                </div>
            </div>
        </nav>
    </div>
    <div class="container">
        <div class="image_cont">
            <div id="user_image">
                <img src="../<?php print_r($_SESSION['image']) ?>">
            </div>
            <p><?php echo ($_SESSION['name']) ?></p>
        </div>
    </div>
    <!-- <script src="js/log.js"></script> -->
</body>

</html>