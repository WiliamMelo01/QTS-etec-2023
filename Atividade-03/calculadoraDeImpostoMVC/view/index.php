
<?php
session_start();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/styles.css">
    <title>Document</title>
</head>

<body>
    <div class="alinhamento-forms">
        <form method="POST" action="../controller/validacpf.php" class="formulario">
            <h1 class="titulo">CALCULAR IMPOSTO</h1>
            <input type="text" class="input nome" name="nome" placeholder="Digite seu Nome" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" maxlength="100" title="Seomente letras, espaços, ' e -" required />
            <?php 
                if(isset($_SESSION['cpfInvalido'])){
                    echo("
                        <p style='color:#DC143C; font-weight:bold; text-align:left; text-shadow: 1px 1px black;'>
                           CPF INVALIDO     
                        </p>
                    ");
                }
            ?>
            <input type="text" class="input cpf" name="cpf" placeholder="Digite seu CPF" title="Somente numeros" minlength="11"  maxlength="14" required />
            <input type="text" class="input rendimento" name="rendimento" placeholder="Digite seu Rendimento Anual" pattern="^[1-9]\d*(\.\d{1,2})?$" min="1" maxlength="9" title="O valor tem que ser um numero maior ou igual a um." required />
            <input type="submit" class="button-forms"  value="Calcular"   />
        </form>
    </div>

</body>

</html>









<?php
if (isset($_SESSION['cpfInvalido'])) {
    unset($_SESSION['cpfInvalido']);
    session_destroy();
}
?>