    <?php
    require_once "conect.php";

    $connection->query("CREATE DATABASE IF NOT EXISTS ydcv");
    $connection->query("USE ydcv");
    $result = $connection->query("SHOW TABLES LIKE 'cv_userdata'");
    if (($result->num_rows) == 0) {
        $query = "CREATE TABLE `ydcv`.`cv_userdata`( 
                                                     `id` INT NOT NULL AUTO_INCREMENT,
                                                     `type_id` INT NOT NULL DEFAULT '1',
                                                     `name` VARCHAR(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                                                     `email` VARCHAR(26) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                                                     `mail_gen` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                                                     `password` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
                                                     `image` VARCHAR (55) NOT NULL,
                                                     `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                     `status` VARCHAR(100) NOT NULL DEFAULT 'pending', 
                 PRIMARY KEY (`id`), UNIQUE (`email`)) ENGINE = InnoDB";
        $connection->query($query);
    }
