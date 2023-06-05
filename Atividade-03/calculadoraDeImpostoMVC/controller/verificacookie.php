<?php

session_start();

if (isset($_SESSION['cpfInvalido'])) {
    unset($_SESSION['cpfInvalido']);
    session_destroy();
}

?>

