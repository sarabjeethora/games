'use strict';

let player = 0;
const rollDice = () => Math.trunc(Math.random() * 6) + 1;

const resetGame = function () {
    initialize();
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");
    document.querySelector('.btn--roll').removeAttribute("disabled");
    document.querySelector('.btn--hold').removeAttribute("disabled");
    document.getElementById("current--0").textContent = 0;
    document.getElementById("current--1").textContent = 0;
    document.getElementById("name--0").textContent = "Player 1";
    document.getElementById("name--1").textContent = "Player 2";
    player = 0;
}

const switchPlayer = function (currentPlayer) {
    player = currentPlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${currentPlayer}`).classList.remove("player--active");
    document.querySelector(`.player--${player}`).classList.add("player--active");
    return player;
};

const updateCurrentScore = function (player, diceValue) {
    let currentScore = Number(document.getElementById(`current--${player}`).textContent);
    if (diceValue === 1) {
        document.getElementById(`current--${player}`).textContent = 0;
        switchPlayer(player);
    } else {
        currentScore += diceValue;
        document.getElementById(`current--${player}`).textContent = currentScore;
    }
};

const holdScore = function (player) {
    const currentScore = Number(document.getElementById(`current--${player}`).textContent);
    let score = Number(document.getElementById(`score--${player}`).textContent);
    score += currentScore;
    document.getElementById(`score--${player}`).textContent = score;
    document.getElementById(`current--${player}`).textContent = 0;
    if (score >= 100) {
        document.querySelector('.btn--roll').setAttribute("disabled", "true");
        document.querySelector('.btn--hold').setAttribute("disabled", "true");
        document.getElementById(`name--${player}`).textContent = `Player ${player + 1} wins`;
    } else {
        switchPlayer(player);
    }
}

const displayDice = function (player) {
    const dice = document.querySelector('.dice');
    const diceValue = rollDice();
    console.log(diceValue); // Remove after Testing
    switch (diceValue) {
        case 1:
            dice.classList.remove("hidden");
            dice.setAttribute("src", "dice-1.png");
            break;
        case 2:
            dice.classList.remove("hidden");
            dice.setAttribute("src", "dice-2.png");
            break;
        case 3:
            dice.classList.remove("hidden");
            dice.setAttribute("src", "dice-3.png");
            break;
        case 4:
            dice.classList.remove("hidden");
            dice.setAttribute("src", "dice-4.png");
            break;
        case 5:
            dice.classList.remove("hidden");
            dice.setAttribute("src", "dice-5.png");
            break;
        case 6:
            dice.classList.remove("hidden");
            dice.setAttribute("src", "dice-6.png");
            break;
    }
    updateCurrentScore(player, diceValue);
};

const initialize = function () {
    document.getElementById("score--0").textContent = 0;
    document.getElementById("score--1").textContent = 0;
    document.querySelector('.dice').classList.add("hidden");
};

const mainGame = function () {
    initialize();
    document.querySelector('.btn--roll').addEventListener('click', function () {
        displayDice(player);
    });
    document.querySelector('.btn--hold').addEventListener('click', function () {
        holdScore(player);
    });
    document.querySelector('.btn--new').addEventListener('click', resetGame);
}

mainGame();