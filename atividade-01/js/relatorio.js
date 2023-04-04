import { calculaValores } from "./calculaValores.js";
import { validaCpf } from "./validaCpf.js";

const urlParams = new URLSearchParams(window.location.href);
const rendaAnual = urlParams.get("Renda_Anual");
const cpf = urlParams.get("cpf");

validaCpf("2985|jtGOKgtms3T4HQKwlY25wD6ckLDqf5H8", cpf).catch(() => {
  localStorage.setItem("invalidCpf", JSON.stringify({ invalid: true }));
  window.location.href = "/QTS-atividade-1";
});

if(rendaAnual <= 0){
  localStorage.setItem("rendaAnualInvalida", JSON.stringify({ invalid: true }));
  window.location.href = "/QTS-atividade-1";
}

const [aliquota, valorAPagar] = calculaValores(rendaAnual);

const botaoCalcularOutroImposto = document.querySelector("button");
const spanAliquota = document.querySelector("#aliquota");
const spanValorAPagar = document.querySelector("#valor_a_pagar");

spanAliquota.innerHTML = `${aliquota}%`;
spanValorAPagar.innerHTML = `${valorAPagar.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
})}`;

botaoCalcularOutroImposto.addEventListener("click", () => {
  window.location.href = "/QTS-atividade-1";
});
