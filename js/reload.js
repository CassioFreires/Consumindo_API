let ul = document.querySelector('#ul-reload');
let ingrediente_do_drink_reload = document.getElementById('ingrediente-reload');
let quantidade_do_drink_reload = document.getElementById('quantidade-reload');
let contador = 0;
let ingredientes = [];
let quantidade_ingredientes = [];

// Função que retorna uma API assincrona
async function retornarApiAleatoria() {
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`).then(resposta => {
        return resposta.json();
    });
    let novoResponse = response.drinks.filter(item => {
        console.log(item.idDrink);
        criarLi(item.strDrink)
        criarLi(item.strDrinkThumb)
        criarLi(item.strCategory)
        criarLi(item.strGlass)

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

        // Chamada de função
        editandoTagIngredientes()
        ingredientes.forEach(item => {
            if (item !== null && item !== undefined) {
                let text = document.createTextNode(item);
                ingrediente_do_drink_reload.appendChild(text)
            }
        })

        // Chamada de função
        editandoTagQuantidadeIngrediente()
        quantidade_ingredientes.forEach(item => {
            if (item !== null && item !== undefined) {
                let text = document.createTextNode(item);
                quantidade_do_drink_reload.appendChild(text)
                return;
            }
        })
    })

    // Chamada de função
    alterarTagLi(response)
}
// Chamada de função
retornarApiAleatoria()


// Função que cria uma tag li 
function criarLi(value) {
    let li = document.createElement('li');
    li.classList = `li-${contador++}`;
    let texto = document.createTextNode(value);
    ul.appendChild(li);
    li.appendChild(texto);
}

// Função que altera a tag li criada
function alterarTagLi(value) {
    let li_1 = document.querySelector('.li-0');
    let li_2 = document.querySelector('.li-1');
    let li_3 = document.querySelector('.li-2');
    let li_4 = document.querySelector('.li-3');

    let novoResponse = value.drinks.filter(item => {
        li_1.innerHTML = `<span>Nome do Drink: </span> ${item.strDrink}`;
        li_2.innerHTML = `<span>Imagem: </span><img class='img-reload' src='${item.strDrinkThumb}'></img>`;
        li_3.innerHTML = `<span>Categoria: </span> ${item.strCategory}`;
        li_4.innerHTML = `<span>Copo do Drink: </span> ${item.strGlass}`;

    })

}


// Função que editar o paragrafo de ingredientes e criar um span simulando uma chave
function editandoTagIngredientes () {
    return ingrediente_do_drink_reload.innerHTML = '<span class="cor-span">Ingredientes: </span>';
};
// Função que editar o paragrafo de ingredientes e criar um span simulando uma chave
function editandoTagQuantidadeIngrediente () {
    return quantidade_do_drink_reload.innerHTML = '<span class="cor-span">Quantidade do drink: </span>';
};