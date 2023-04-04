export async function validaCpf(token, cpf) {
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
