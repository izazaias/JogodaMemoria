const cards = [
    '🐕',
    '🐕',
    '🦍',
    '🦍',
    '🐠',
    '🐠',
    '🐦',
    '🐦',
    '🐇',
    '🐇',
    '🦇',
    '🦇',
    '🐷',
    '🐷',
    '🐸',
    '🐸',
  ];
  
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let matchedPairs = 0;
  let attemptCount = 0;
  let startTime;
  let modal, closeModalBtn, timeTakenElem, finalAttemptsElem, bestRecordElem;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function initializeGame() {
    matchedPairs = 0;
    attemptCount = 0;
    startTime = new Date();
    updateAttemptCount();
    const gameContainer = document.querySelector('.memory-game');
    gameContainer.innerHTML = '';
    shuffle(cards);
  
    cards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('memory-card', 'shuffle');
      cardElement.innerHTML = `
        <div class="front">${card}</div>
        <div class="back"></div>
      `;
      gameContainer.appendChild(cardElement);
    });
  
    setTimeout(removeShuffleEffect, 1000);
  
    document
      .querySelectorAll('.memory-card')
      .forEach((card) => card.addEventListener('click', flipCard));
  }
  
  function removeShuffleEffect() {
    document
      .querySelectorAll('.memory-card')
      .forEach((card) => card.classList.remove('shuffle'));
  }
  
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
  
    secondCard = this;
    attemptCount++;
    updateAttemptCount();
    checkForMatch();
  }
  
  function checkForMatch() {
    let isMatch =
      firstCard.querySelector('.front').textContent ===
      secondCard.querySelector('.front').textContent;
  
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    matchedPairs++;
    resetBoard();
  
    if (matchedPairs === cards.length / 2) {
      setTimeout(showModal, 1000); 
    }
  }
  
  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1500);
  }
  
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
  
  function updateAttemptCount() {
    document.getElementById('attempt-count').textContent = attemptCount;
  }
  
  function showModal() {
    const endTime = new Date();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    timeTakenElem.textContent = `${timeTaken} segundos`;
    finalAttemptsElem.textContent = attemptCount;
  
    const bestRecord = localStorage.getItem('bestRecord');
    if (!bestRecord || attemptCount < bestRecord) {
      localStorage.setItem('bestRecord', attemptCount);
      bestRecordElem.textContent = `Novo recorde: ${attemptCount}`;
    } else {
      bestRecordElem.textContent = bestRecord;
    }
  
    modal.style.display = 'block';
  }
  
  function closeModal() {
    modal.style.display = 'none';
    initializeGame();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    modal = document.getElementById('modal');
    closeModalBtn = document.querySelector('.close-btn');
    timeTakenElem = document.getElementById('time-taken');
    finalAttemptsElem = document.getElementById('final-attempts');
    bestRecordElem = document.getElementById('best-record');
    restartBtn = document.getElementById('restart-btn'); 
  
    closeModalBtn.addEventListener('click', closeModal);
    restartBtn.addEventListener('click', initializeGame); 
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  
    initializeGame();
  });
  