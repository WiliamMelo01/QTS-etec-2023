<?php

require_once dirname(__FILE__) . '\..\model\validacao.php';

session_start();

$cpf = $_POST['cpf'];
$nome = $_POST['nome'];
$rendimentos = $_POST['rendimento'];

if (!Validacao::validarCPF($cpf)) {
    $_SESSION['cpfInvalido'] = uniqid();
    header("Location:../view/index.php");
}else{
    header("Location:../view/resultado.php?nome=".$nome."&cpf=".$cpf."&rendimento=".$rendimentos); 
}

?>