let animals = ['Cachorro', 'Gato', 'Pato', 'Coelho', 'Leão', 'Elefante', 'Girafa', 'Tigre'];
let board = document.getElementById('board');
let revealed = [];
let firstCard = null;
let secondCard = null;
let canClick = false;
let pairsFound = 0;

function createBoard() {
    animals = animals.concat(animals); // Duplicate animals to make pairs
    shuffleArray(animals);

    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', i);
        card.addEventListener('click', () => flipCard(i));
        board.appendChild(card);
    }
}

function flipCard(index) {
    if (!canClick || revealed[index]) return;

    const card = board.children[index];
    card.textContent = animals[index];
    card.classList.add('flipped');
    
    if (firstCard === null) {
        firstCard = index;
    } else {
        secondCard = index;
        checkMatch();
    }
}

function checkMatch() {
    canClick = false;
    setTimeout(() => {
        const animal1 = animals[firstCard];
        const animal2 = animals[secondCard];

        if (animal1 === animal2) {
            pairsFound++;
            revealed[firstCard] = true;
            revealed[secondCard] = true;
            if (pairsFound === 8) {
                showEndScreen();
            }
        } else {
            const card1 = board.children[firstCard];
            const card2 = board.children[secondCard];
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        firstCard = null;
        secondCard = null;
        canClick = true;
    }, 1000);
}

function startGame() {
    animals = ['Cachorro', 'Gato', 'Pato', 'Coelho', 'Leão', 'Elefante', 'Girafa', 'Tigre'];
    board.innerHTML = '';
    revealed = Array(16).fill(false);
    firstCard = null;
    secondCard = null;
    canClick = true;
    pairsFound = 0;
    createBoard();
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.memory-game').style.display = 'block';
    document.querySelector('.end-screen').style.display = 'none';
}

function restartGame() {
    startGame();
}

function showEndScreen() {
    document.querySelector('.memory-game').style.display = 'none';
    document.querySelector('.end-screen').style.display = 'block';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

