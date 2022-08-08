'use strict';
//Select Element
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const scoreEL0 = document.querySelector('#score--0');
const scoreEL1 = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
let scores = [0, 0];

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const holdBTN = document.querySelector('.btn--hold');
let currentNumber = 0;
let activeUser = 0;
let winner = true;

///
const changePlayer = function () {
  currentNumber = 0;
  document.getElementById(`current--${activeUser}`).textContent = currentNumber;
  activeUser = activeUser === 1 ? 0 : 1;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//start Condination
scoreEL0.textContent = 0;
scoreEL1.textContent = 0;
diceEl.classList.add('hidden');

//roll dice

btnRoll.addEventListener('click', function () {
  if (winner) {
    diceEl.classList.remove('hidden');
    const diceCont = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `dice-${diceCont}.png`;

    if (diceCont !== 1) {
      currentNumber += diceCont;
      document.getElementById(`current--${activeUser}`).textContent =
        currentNumber;
    } else {
      changePlayer();
    }
  }
});

holdBTN.addEventListener('click', function () {
  if (winner) {
    scores[activeUser] += currentNumber;
    document.getElementById(`score--${activeUser}`).textContent =
      scores[activeUser];
    if (scores[activeUser] >= 20) {
      document
        .querySelector(`.player--${activeUser}`)
        .classList.add('player--winner');
      winner = false;
      diceEl.classList.add('hidden');
    }

    changePlayer();
  }
});

btnNew.addEventListener('click', function () {
  winner = true;
  scores = [0, 0];
  player0EL.classList.add('player--active');
  activeUser = 0;
  currentNumber = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player1EL.classList.remove('player--active');
});
