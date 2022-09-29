//  INICIO VARIAVEIS GLOBAIS
let input = document.querySelector('#input');
let ul = document.querySelector('#ul');
let h3 = document.querySelector('#title');
let divConteudoDrink = document.querySelector('#conteudo-drink');

let nome_do_drink = document.querySelector('#nome-do-drink');
let foto_do_drink = document.querySelector('#foto-do-drink');
let categoria_do_drink = document.querySelector('#categoria-do-drink');
let copo_do_drink = document.querySelector('#copo-do-drink');
let preparo_do_drink = document.querySelector('#preparo-do-drink');
let ingrediente_do_drink = document.querySelector('#ingrediente');
let quantidade_do_drink = document.querySelector('#quantidade-do-drink');

let ingredientes = [];
let quantidade_ingredientes = [];
let contador = 0;
// FINAL VARIAVEIS GLOBAIS


function Drink(input) {
    this.input = input;

    // Retorna uma API de drinks
    this.retornarApi = async function () {
        let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.input}`).then(resposta => {
            return resposta.json()
        });
        let novoResponde = response.drinks.filter((item, indice, array) => {
            this.criarLi(item.strDrink);
        })
        this.clickNaListaDeDrinks(response)
    }

    // Função cria uma tag (li) e manipula a API
    this.criarLi = function (nomeDoDrink) {
        let li = document.createElement('li');
        let texto = document.createTextNode(nomeDoDrink);
        ul.appendChild(li)
        li.appendChild(this.criarLink(nomeDoDrink));
        this.criarLink(nomeDoDrink).appendChild(texto);

    }

    // Função cria uma tag (a) e manipula a API
    this.criarLink = function (texto) {
        let a = document.createElement('a');
        a.classList = 'style-list';
        a.innerHTML = texto;
        return a;
    }

    // Função que escreve o title da lista
    this.titleDrink = function () {
        h3.innerHTML = 'Lista de drinks';
        return h3;
    }

    // Função que faz com que manipule os elementos após clicar em alguma lista de drinks
    this.clickNaListaDeDrinks = function (array) {
        let li = document.querySelectorAll('#ul li');
        li.forEach(item => {
            item.addEventListener('click', e => {
                const el = e.target.textContent;
                const novoArray = array.drinks.filter(item => {
                    if (el === item.strDrink) {
                        nome_do_drink.innerHTML = `<span>Nome do drink: </span> ${item.strDrink}`;
                        foto_do_drink.innerHTML = `<span>Foto: </span> <br/> <img src="${item.strDrinkThumb}" class="img-drink"/>`;
                        categoria_do_drink.innerHTML = `<span>Categoria: </span> ${item.strCategory}`;
                        copo_do_drink.innerHTML = `<span>Copo: </span> ${item.strGlass}`;
                        preparo_do_drink.innerHTML = `<span>Preparo do drink: </span> ${item.strInstructions}`;
                        // Desestruturação (desctructor)
                        let {
                            strIngredient1,
                            strIngredient2,
                            strIngredient3,
                            strIngredient4,
                            strIngredient5,
                            strIngredient,
                            strIngredient7,
                            strIngredient8,
                            strIngredient9,
                            strIngredient10,
                            strIngredient11,
                            strIngredient12,
                            strIngredient13,
                            strIngredient14,
                            strIngredient15
                        } = item;

                        let {
                            strMeasure1,
                            strMeasure2,
                            strMeasure3,
                            strMeasure4,
                            strMeasure5,
                            strMeasure,
                            strMeasure7,
                            strMeasure8,
                            strMeasure9,
                            strMeasure10,
                            strMeasure11,
                            strMeasure12,
                            strMeasure13,
                            strMeasure14,
                            strMeasure15
                        } = item;

                        // Add no array
                        ingredientes.push(strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15);
                        quantidade_ingredientes.push(strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15);

                        // Chamada da função
                        this.editandoTagIngredientes();
                        ingredientes.forEach(item => {
                            if (item !== null && item !== undefined) {
                                let texto = document.createTextNode(item);
                                ingrediente_do_drink.appendChild(texto)
                                return;
                            }
                        })

                        // Chamada da função
                        this.editandoTagQuantidadeIngrediente();
                        quantidade_ingredientes.forEach(item => {
                            if (item !== null && item !== undefined) {
                                let texto = document.createTextNode(item);
                                quantidade_do_drink.appendChild(texto)
                                return;
                            }
                        })
                        // Chamada da função
                        this.mudarBackgroundSecao1()
                    }
                })
            })
        })

    };

    // Função que editar o paragrafo de ingredientes e criar um span simulando uma chave
    this.editandoTagIngredientes = function () {
        return ingrediente_do_drink.innerHTML = '<span">Ingredientes: </span>';
    };
    // Função que editar o paragrafo de ingredientes e criar um span simulando uma chave
    this.editandoTagQuantidadeIngrediente = function () {
        return quantidade_do_drink.innerHTML = '<span>Quantidade do drink: </span>';
    };

    // Função para alterar background do conteudo após clicar na lista de drinks
    this.mudarBackgroundSecao1 = function () {
        let section1 = document.querySelector('#subconteudo-drink');
        section1.style.width = '500px';
        section1.style.borderRadius = '15px';
        section1.style.padding = '15px';
        section1.style.boxShadow = '2px 2px 20px grey';
        return section1.style.background = 'yellow';
    };

    // Função que vai limpar o input após clicar no botao de pesquisar
    this.limarInput = function () {
        let input = document.querySelector('#input');
        return input.value = '';
    }





}
// Função do botao pesquisar
function btnPesquisar() {
    const drink = new Drink(input.value);
    drink.retornarApi();
    drink.titleDrink();
    drink.limarInput();
    console.log(drink)
}

// Função quando da refresh com F5 carrega outra página
function reload() {
    let unicode = event.which;
     if (unicode === 116) {
         return window.location.href = 'pagina_reload.html';
     }
}
