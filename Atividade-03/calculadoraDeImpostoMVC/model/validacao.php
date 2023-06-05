<?php

class Validacao
{
    static  function validarCPF($cpf)
    {
        // Remover qualquer formatação do CPF (pontos e traços)
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        // Verificar se o CPF tem 11 dígitos
        if (strlen($cpf) != 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        // Calcular o primeiro dígito verificador
        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += (int) $cpf[$i] * (10 - $i);
        }
        $digito1 = 11 - ($soma % 11);
        if ($digito1 >= 10) {
            $digito1 = 0;
        }

        // Calcular o segundo dígito verificador
        $soma = 0;
        for ($i = 0; $i < 10; $i++) {
            $soma += (int) $cpf[$i] * (11 - $i);
        }
        $digito2 = 11 - ($soma % 11);
        if ($digito2 >= 10) {
            $digito2 = 0;
        }

        // Verificar se os dígitos verificadores estão corretos
        if ($cpf[9] == $digito1 && $cpf[10] == $digito2) {
            return true;
        } else {
            return false;
        }
    }
}
