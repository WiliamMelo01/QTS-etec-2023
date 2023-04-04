const cpfInvalid = JSON.parse(localStorage.getItem("invalidCpf"));
localStorage.removeItem("invalidCpf");
const rendaAnualInvalida = JSON.parse(
  localStorage.getItem("rendaAnualInvalida")
);
localStorage.removeItem("rendaAnualInvalida");
const erro = document.querySelector("#erro");

if (cpfInvalid && cpfInvalid.invalid) {
  erro.innerHTML = `O CPF INFORMADO È INVALIDO!`;
} else if (rendaAnualInvalida && rendaAnualInvalida.invalid) {
  erro.innerHTML = `A RENDA ANUAL NÂO PODE SER 0 OU MENOR`;
} else {
  erro.innerHTML = "";
}

const form = document.querySelector("form");
const nome = document.querySelector("#nome");
const cpf = document.querySelector("#cpf");
const rendaAnual = document.querySelector("#renda_anual");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  validaCpf("2985|jtGOKgtms3T4HQKwlY25wD6ckLDqf5H8", cpf.value)
    .then(() => {
      //CPF VALIDO MAS RENDA ANUAL INVALIDA
      if (rendaAnual.value <= 0) {
        erro.innerHTML = `A RENDA ANUAL NÂO PODE SER 0 OU MENOR!`;
      } else {
        window.location.href = `/QTS-atividade-1/relatorio.html?Nome=${nome.value}&Cpf=${cpf.value}&Renda_Anual=${rendaAnual.value}`;
      }
    })
    .catch(() => {
      erro.innerHTML = `O CPF INFORMADO È INVALIDO!`;
    });
});

async function validaCpf(token, cpf) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://api.invertexto.com/v1/validator?token=${token}&value=${cpf}`
    );
    const value = await response.json();
    console.log(value);
    if (!value.valid) {
      reject(new Error("CPF inválido"));
    }
    resolve();
  });
}
