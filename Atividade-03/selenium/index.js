import { expect } from 'chai';
import pkg, { By } from 'selenium-webdriver';
const { Builder } = pkg;
describe('Imposto testes', () => {
    let driver 
    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await driver.get('http://localhost/calculadoraDeImpostoMVC/view/');
    
        await driver.manage().window().maximize()
    })

    after(function(){
        driver.quit();
    });

    it('Não deve retornar o formulário com todos os campos em branco.', async () => {
        

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")

    })

    it('Não deve enviar o formulário com um nome inválido.', async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("N0m& 1nv@l1d0")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("80000")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")

    })

    it("Não deve enviar o formulário com o campo de nome em branco.",async ()=>{
        

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("80000")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")

    })

    it('Não deve enviar o formulário com um CPF inválido.', async () => {

        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("11111111111")

        await driver.findElement(By.name("rendimento")).sendKeys("80000")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/index.php")

        await driver.navigate().refresh();

        await driver.findElement(By.name("nome")).sendKeys("Valid name")

        await driver.findElement(By.name("cpf")).sendKeys("CPF INVALIDO")

        await driver.findElement(By.name("rendimento")).sendKeys("80000")

        await driver.findElement(By.className("button-forms")).click()

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/index.php")

    })

    it('Não deve enviar o formulário com o campo CPF em branco.', async () => {
        await driver.findElement(By.name("nome")).sendKeys("Valid name")

        await driver.findElement(By.name("rendimento")).sendKeys("80000")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")
    })

    it('Não deve enviar o formulário com a renda anual negativa.', async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("-15")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")
    })

    it('Não deve enviar o formulário com a renda anual como texto.', async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("TEXTO")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")
    })

    it('Não deve enviar o formulário com a renda anual em branco.', async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")
    })

    it('Não deve enviar o formulário com a renda anual igual a zero.', async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("0")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/")
    })

    it("Deve enviar o formulário e redirecionar o usuário para a rota /resultado quando dados válidos forem fornecidos.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("48000")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=48000")
    })

    it("Deve mostrar a 'alíquota' como 0% quando a renda anual for menor do que 22.847,77.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("22847.76")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=22847.76")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 0%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 0,00")
    })

    it("Deve mostrar a 'alíquota' como 7,5% quando a renda anual for maior do que 22.847,76 e menor do que 33.919,81.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("22847.77")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=22847.77")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 7.5%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 1.713,58")
    })

    it("Deve mostrar a 'alíquota' como 7,5% quando a renda anual for maior do que 22.847,76 e menor do que 33.919,81.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("33919.8")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=33919.8")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 7.5%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 2.543,99")
    })

    it("Deve mostrar a 'alíquota' como 15% quando a renda anual for maior do que 33.919,80 e menor do que 45.012,61.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("33919.81")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=33919.81")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 15%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 5.087,97")
    })

    it("Deve mostrar a 'alíquota' como 15% quando a renda anual for maior do que 33.919,80 e menor do que 45.012,61.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("45012.6")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=45012.6")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 15%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 6.751,89")
    })

    it("Deve mostrar a 'alíquota' como 22,5% quando a renda anual for maior do que 45.012,60 e menor do que 55.976,17.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("45012.61")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=45012.61")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 22.5%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 10.127,84")
    })

    it("Deve mostrar a 'alíquota' como 22,5% quando a renda anual for maior do que 45.012,60 e menor do que 55.976,17.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("55976.16")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=55976.16")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 22.5%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 12.594,64")
    })

    it("Deve mostrar a 'alíquota' como 27,5% quando a renda anual for maior do que 55.976,16.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("55976.17")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=55976.17")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 27.5%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 15.393,45")
    })

    it("Deve mostrar a 'alíquota' como 27,5% quando a renda anual for maior do que 55.976,16.", async () => {
        

        await driver.findElement(By.name("nome")).sendKeys("Nome valido")

        await driver.findElement(By.name("cpf")).sendKeys("24195436885")

        await driver.findElement(By.name("rendimento")).sendKeys("94976.17")

        await driver.findElement(By.className("button-forms")).click()

        const currentUrl = await driver.getCurrentUrl();

        expect(currentUrl).to.equal("http://localhost/calculadoraDeImpostoMVC/view/resultado.php?nome=Nome%20valido&cpf=24195436885&rendimento=94976.17")

        const aliquota =await driver.findElement(By.className("aliquota")).getText();
        const imposto = await driver.findElement(By.className("imposto")).getText();

        expect(aliquota).to.be.equal("Aliquota: 27.5%")
        expect(imposto).to.be.equal("Imposto a pagar: R$ 26.118,45")
    })


})
