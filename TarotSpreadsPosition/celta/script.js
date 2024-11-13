let currentCardIndex = 1;  // Controla el orden de selección de cartas
let spreadType = '';  // Tipo de tirada actual

// Función para iniciar la lectura de tarot
function startReading(type) {
    document.getElementById("readingArea").innerHTML = '';  // Limpiar área de lectura
    currentCardIndex = 1;  // Reiniciar índice de carta
    spreadType = type;

    if (type === 'celtic') {
        setupCelticSpread();
    } else if (type === 'star') {
        setupStarSpread();
    }

    updateCardCounter(10);  // Inicializar el contador de cartas
}

// Función para actualizar el contador de cartas restantes
function updateCardCounter(totalCards) {
    const counter = document.getElementById("cardCounter");
    counter.textContent = `Cartas restantes: ${totalCards - (currentCardIndex - 1)}`;
}

// Configuración para la Tirada Celta
function setupCelticSpread() {
    const positions = [
        { top: "50%", left: "40%" },  // Carta 1 - Situación Actual
        { top: "50%", left: "50%" }, // Carta 2 - Desafío, a la derecha de la carta 1
        { top: "65%", left: "45%" },  // Carta 3 - Lo que necesitas enfocar (debajo de la carta 1)
        { top: "50%", left: "30%" },  // Carta 4 - Tu pasado / Lo que dejas atrás
        { top: "35%", left: "45%" },  // Carta 5 - Fortalezas (arriba de la carta 1)
        { top: "50%", left: "60%" },  // Carta 6 - Futuro cercano (a la derecha de la carta 1)
        { top: "10%", left: "70%" },  // Carta 7 - Consejo (columna de cartas a la derecha, arriba)
        { top: "25%", left: "70%" },  // Carta 8 - Entorno (debajo de la carta 7)
        { top: "40%", left: "70%" },  // Carta 9 - Esperanzas y Miedos
        { top: "55%", left: "70%" }   // Carta 10 - Resultado potencial
    ];

    positions.forEach((pos, index) => createCard(pos, index + 1));
}

// Configuración para la Tirada Estrella
function setupStarSpread() {
    const positions = [
        { top: "30%", left: "50%" },  // Carta 1 (arriba del hexágono)
        { top: "55%", left: "30%" },  // Carta 2 (izquierda)
        { top: "55%", left: "70%" },  // Carta 3 (derecha)
        { top: "70%", left: "50%" },  // Carta 4 (abajo del hexágono)
        { top: "45%", left: "20%" },  // Carta 5 (izquierda arriba)
        { top: "45%", left: "80%" },  // Carta 6 (derecha arriba)
        { top: "50%", left: "50%" }   // Carta 7 (centro del hexágono)
    ];

    positions.forEach((pos, index) => createCard(pos, index + 1));
}

// Función para crear una carta en una posición específica
function createCard(position, cardNumber) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.cardNumber = cardNumber; // Identificador de la carta
    card.style.top = position.top;
    card.style.left = position.left;
    if (position.transform) card.style.transform = position.transform;

    card.onclick = () => selectCard(card);

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = `Carta ${cardNumber}`;

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = `Significado ${cardNumber}`;

    card.appendChild(front);
    card.appendChild(back);

    document.getElementById("readingArea").appendChild(card);
}

// Función para seleccionar y voltear la carta, con control de orden de selección
function selectCard(card) {
    const cardNumber = parseInt(card.dataset.cardNumber);

    if (cardNumber !== currentCardIndex) {
        alert(`Por favor selecciona la Carta ${currentCardIndex} primero.`);
        return;
    }

    flipCard(card);
    currentCardIndex++;
    updateCardCounter(10);
}

// Función para voltear la carta sin cambiar su posición
function flipCard(card) {
    card.classList.toggle("flipped");
}
