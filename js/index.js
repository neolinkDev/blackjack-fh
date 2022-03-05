// VARIABLES
let deckOfCards = [];
const deckTypes = ["C", "H", "D", "S"];
const specials = ["A", "J", "Q", "K"];

// FUNCIONES
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

  // console.log(deckOfCards);
  
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

  console.log(deckOfCards);
  console.log(card);

  return card;
};

// deckOfCards = [];
// askCard();

// Valor de la carta
const cardValue = (card) => {
  
  const value = card.substring(0, card.length - 1);

  return (isNaN(value)) ? 
            (value === 'A') ? 11 : 10
            : Number(value);
};

const value = cardValue(askCard());
console.log( {value} )
