<?php

require_once dirname(__FILE__) . '\..\model\User.php';
require_once dirname(__FILE__) . '\..\model\validacao.php';


$nome = $_GET['nome'];
$rendimento = $_GET['rendimento'];
$cpf = $_GET['cpf'];

$user = new User();
$user->setNome($nome);
$user->setCpf($cpf);
$user->setRendimento($rendimento);
$user->calcularAliquota();
$user->calcularImposto();

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/resultado.css">
    <title>Document</title>
</head>

<body>
    <div class="container">
        <div class="resultado">
            <h1 style="color: white;">Resultado</h1>
            <div class="aliquota">
                <p>Aliquota: <?php echo $user->aliquota; ?>% </p>
            </div>
            <div class="imposto">
                <p>Imposto a pagar: R$ <?php echo $user->imposto ?></p>
            </div>
        </div>
    </div>


</body>

</html>