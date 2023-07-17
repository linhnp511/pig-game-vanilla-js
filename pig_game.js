let currentScore, activePlayer, playingState;

const totalScore0El = document.getElementById("score--0");
const totalScore1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const bg0El = document.querySelector(".player--0");
const bg1El = document.querySelector(".player--1");
let diceVal = 0;
let totalScore = [0, 0];

function init() {
  playingState = true;
  activePlayer = 0;
  currentScore = 0;
  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add("hidden");
  bg0El.classList.add("player--active");
  bg1El.classList.remove("player--active");
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  bg0El.classList.toggle("player--active");
  bg1El.classList.toggle("player--active");
}

init();

//Roll dice
btnRoll.addEventListener("click", function () {
  if (playingState) {
    // random
    diceVal = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceVal}.png`;
    if (diceVal !== 1) {
      // !==1 -> update dice to current score
      currentScore += diceVal;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(currentScore);
    } else {
      // ===1 -> reset current score and switch player
      switchPlayer();
    }
  }
});

//Hold dice
btnHold.addEventListener("click", function () {
  if (playingState) {
    //Update current score to total score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    if (totalScore[activePlayer] < 100) {
      //If total score <100 switch player
      switchPlayer();
    } else {
      //Else current active player wins
      playingState = false; // so that we cannot click btns after winning state
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    }
  }
});

//New game
btnNew.addEventListener("click", init);
