// VARIABLES //
let deckOfCards = [];
let playerPoints = 0;
let crupierPoints = 0;
const deckTypes = ["C", "H", "D", "S"];
const specials = ["A", "J", "Q", "K"];
// Botones del HTML
const $pedirCarta = document.getElementById("btn-pedirCarta"),
  $nuevoJuego = document.getElementById("btn-nuevoJuego"),
  $detener = document.getElementById("btn-detener");

const $smalls = document.querySelectorAll("small");
const $cardsPlayer = document.getElementById("cards-player");

// FUNCIONES //
// Creamos la baraja
const createDeck = () => {
  // creamos la baraja del 2 al 10
  for (let i = 2; i <= 10; ++i) {
    for (let type of deckTypes) {
      deckOfCards.push(i + type);
    }
  }

  // Creamos la baraja de A, J, Q y K
  for (let type of deckTypes) {
    for (let special of specials) {
      deckOfCards.push(special + type);
    }
  }
  // Barajeamos el deck
  deckOfCards = _.shuffle(deckOfCards);
  console.log(deckOfCards);
  return deckOfCards;
};

/* al ejecutar esta función, globalmente el deckOfCards ya tiene la baraja barajeada 
y por lo tanto en la funcion askCard() tiene esos mismo valores, si no ejecutaramos
esta función el arreglo de deskOfCards estaria vacío */
createDeck();

// Pedir una carta
const askCard = () => {
  if (deckOfCards.length === 0) {
    throw "No hay cartas en la baraja";
  }

  const card = deckOfCards.shift();

  return card;
};

// Valor de la carta
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  // value * 1
  return isNaN(value) ? (value === "A" ? 11 : 10) : Number(value);
};

// EVENTOS //

$pedirCarta.addEventListener("click", () => {
  const card = askCard();

  playerPoints += cardValue(card);

  $smalls[0].innerText = playerPoints;

  console.log(playerPoints);

  // <img src="assets/cartas/10S.png" alt="" class="card">
  const $card = document.createElement("img");
  $card.classList.add("card");
  $card.src = `assets/cartas/${card}.png`;
  $cardsPlayer.appendChild($card);

  if (playerPoints > 21) {
    console.warn("¡Perdiste!");
    $pedirCarta.disabled = true;
  } else if (playerPoints === 21) {
    console.warn("¡Ganaste!");
    $pedirCarta.disabled = true;
  }
});
