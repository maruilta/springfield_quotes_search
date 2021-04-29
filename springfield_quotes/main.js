//Variables
const search = document.getElementById("search");
const btnSearch = document.getElementById("btn-search");
const result = document.getElementById("search-results");

// Plantilla para nuevo elemento a crear: nueva quote
function quoteCardTemplate(quote) {
  return (
    `<div class="card text-white bg-warning mb-3">
        <img class="card-img-top" src=${quote.image} alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">${quote.quote}</p>
                    <h5 class="card-title">${quote.character}</h5>
                </div>
    </div>`
  )
}

//Renderizamos todas las frases
function renderAllCards(arrayQuotes){
  const grilla = document.getElementById("cards");
  let contenido = "";
  for (const card of arrayQuotes) {
      contenido += quoteCardTemplate(card);
  }
  grilla.innerHTML = contenido;
}

//Creación del primer array y muestra de los elementos en pantalla
let arrayQuotes = [];
function createArray(data) {
  let array = [];
  for (const quote of data) {
    array.push(quote);
  }
  return array;
}

//traemos todas los datos para las quotes desde la API
function traerQuotes() {
  const nro = 5;
  const url = "https://thesimpsonsquoteapi.glitch.me/quotes?count=" + nro;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      arrayQuotes = createArray(data);
      renderAllCards(arrayQuotes);
    })
    .catch((error) => console.log("error:", error));
}
traerQuotes();

//Búsqueda de una quote
btnSearch.addEventListener("click", (e) => {
  //detenemos el evento por default
  e.preventDefault();
  //armamos el número aleatorio para elegir la posición del primer arreglo
  let aleatorio = Math.floor(Math.random() * arrayQuotes.length);
  console.log(aleatorio);
  //tomamos una posición aleatoria del primer arreglo y la mostramos
  result.innerHTML = quoteCardTemplate(arrayQuotes[aleatorio]);

  //tomamos el valor ingresado en el input
  // const termino = search.value;
  const termino = search.value;
  let res = arrayQuotes.filter(quote => quote.character == termino);
  result.innerHTML = quoteCardTemplate(res[0]);

});



