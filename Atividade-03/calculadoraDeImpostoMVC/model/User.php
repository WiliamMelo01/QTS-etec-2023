<?php

class User
{
    public $nome;
    public $cpf;
    public $rendimento;
    public $aliquota;
    public $imposto;

    function calcularAliquota()
    {
        if ($this->rendimento <= 22847.76) {
            $this->aliquota = 0;
        } else if ($this->rendimento >= 22847.77 && $this->rendimento <= 33919.8) {
            $this->aliquota = 7.5;
        } else if ($this->rendimento >= 33919.81 && $this->rendimento <= 45012.6) {
            $this->aliquota = 15;
        } else if ($this->rendimento >= 45012.61 && $this->rendimento <= 55976.16) {
            $this->aliquota = 22.5;
        } else if ($this->rendimento > 55976.16) {
            $this->aliquota = 27.5;
        }
    }

    function calcularImposto()
    {
        $this->imposto = number_format( ($this->rendimento / 100) * $this->aliquota,2,',','.');
    }


    function setNome($nome)
    {
        $this->nome = $nome;
    }
    function getNome()
    {
        return $this->nome;
    }
    function setCpf($cpf)
    {
        $this->cpf = $cpf;
    }
    function getCpf()
    {
        return $this->cpf;
    }
    function setRendimento($rendimento)
    {
        $this->rendimento = $rendimento;
    }
    function getRendimento()
    {
        return $this->rendimento;
    }
    function setAliquota($aliquota)
    {
        $this->rendimento = $aliquota;
    }
    function getAliquota()
    {
        return $this->rendimento;
    }
    function setImposto($imposto)
    {
        $this->imposto = $imposto;
    }
    function getImposto()
    {
        return $this->imposto;
    }
}
