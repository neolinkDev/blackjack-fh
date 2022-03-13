(() => {
  "use strict";

  // VARIABLES //
  let deckOfCards = [];

  // arreglo donde se guardaran los puntos
  let playersPoints = [];

  const deckTypes = ["C", "H", "D", "S"],
    specials = ["A", "J", "Q", "K"];

  // Botones del HTML
  const $pedirCarta = document.getElementById("btn-pedirCarta"),
    $nuevoJuego = document.getElementById("btn-nuevoJuego"),
    $detener = document.getElementById("btn-detener");

  const $smalls = document.querySelectorAll("small"),
    $divCardsPlayers = document.querySelectorAll("[data-divCards]");

  // FUNCIONES //
  const startGame = (playersNumbers = 2) => {
    /* al ejecutar esta función, globalmente el deckOfCards ya tiene la baraja barajeada 
  y por lo tanto en la funcion askCard() tiene esos mismo valores, si no ejecutaramos
  esta función el arreglo de deskOfCards estaria vacío */
    deckOfCards = createDeck();

    // reiniciamos los puntos de los jugadores
    playersPoints = [];

    // llenamos el arreglo de playersPoints
    for (let i = 0; i < playersNumbers; i++) {
      playersPoints.push(0);
    }

    // reinicia en 0 los puntos que muestra el DOM de cada jugador
    $smalls.forEach((elem) => (elem.innerText = 0));

    // borra las cartas que muestra el DOM de cada jugador
    $divCardsPlayers.forEach((elem) => (elem.innerHTML = ""));

    $pedirCarta.disabled = false;
    $detener.disabled = false;

    // window.location.href = '/';
  };

  // Creamos la baraja
  const createDeck = () => {
    deckOfCards = [];

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
    return _.shuffle(deckOfCards);
  };

  // Pedir una carta
  const askCard = () => {
    if (deckOfCards.length === 0) {
      throw "No hay cartas en la baraja";
    }

    return deckOfCards.shift();
  };

  // Valor de la carta
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    // value * 1
    return isNaN(value) ? (value === "A" ? 11 : 10) : Number(value);
  };

  // Acumulando los puntos del jugador
  // turn donde 0 es el player 1 y en este caso 1 es el crupier(cpu)
  const accumulatePoints = (card, turn) => {
    playersPoints[turn] += cardValue(card);
    $smalls[turn].innerText = playersPoints[turn];

    return playersPoints[turn];
  };

  // Pintando la carta en el DOM
  const createCard = (card, turn) => {
    const $card = document.createElement("img");
    $card.classList.add("card");
    $card.src = `assets/cartas/${card}.png`;
    $divCardsPlayers[turn].appendChild($card);
  };

  // Determina quien gana
  const winner = () => {
    const [minPoints, crupierPoints] = playersPoints;

    setTimeout(() => {
      if (crupierPoints === minPoints) {
        alert("¡NO HAY UN GANADOR!");
      } else if (minPoints > 21) {
        alert("¡PERDISTE!");
      } else if (crupierPoints > 21) {
        alert("¡GANASTE!");
      } else {
        alert("¡PERDISTE!");
      }
    }, 800);
  };

  // Juego del crupier(computadora)
  const crupier = (minPoints) => {
    let crupierPoints = 0;

    do {
      const card = askCard();

      // el turno del crupier siempre será el ultimo elemento del arreglo
      crupierPoints = accumulatePoints(card, playersPoints.length - 1);

      createCard(card, playersPoints.length - 1);
    } while (crupierPoints < minPoints && minPoints <= 21);

    winner();
  };

  // EVENTOS //

  $pedirCarta.addEventListener("click", () => {
    const card = askCard();

    const playerPoints = accumulatePoints(card, 0);

    createCard(card, 0);

    // const $card = document.createElement("img");
    // $card.classList.add("card");
    // $card.src = `assets/cartas/${card}.png`;
    // $cardsPlayer.appendChild($card);

    if (playerPoints > 21) {
      $pedirCarta.disabled = true;
      $detener.disabled = true;
      crupier(playerPoints);
      // alert('¡PERDISTE!')
    } else if (playerPoints === 21) {
      $pedirCarta.disabled = true;
      $detener.disabled = true;
      crupier(playerPoints);
      // alert('¡GANASTE!')
    }
  });

  // logica botón detener
  $detener.addEventListener("click", () => {
    $pedirCarta.disabled = true;
    $detener.disabled = true;
    crupier(playersPoints[0]);
  });

  // limpiando todo el index
  $nuevoJuego.addEventListener("click", () => {
    startGame();
  });
})();
