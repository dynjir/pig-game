var gamePlaying, scores, roundScore, activePlayer, lastDice;
newGame();

document.querySelector(".gameStarted").style.display = "none";
document.querySelector(".leaderboard").style.display = "none";
document.querySelector(".scoreboard").style.display = "none";

//To get out of the instructions
document.querySelector(".btn-startGame").addEventListener("click", function() {
  document.querySelector(".gameStarted").style.display = "contents";
  document.querySelector(".instructions").style.display = "none";
});

//To get out of the Leaderboard
document.querySelector(".btn-newGame").addEventListener("click", function() {
  document.querySelector(".gameStarted").style.display = "contents";
  document.querySelector(".leaderboard").style.display = "none";
  document.querySelector(".instructions").style.display = "none";
  document.querySelector(".scoreboard").style.display = "none";

  newGame();
});

document.querySelector(".btn-roll").addEventListener("click", rollDiceBtn);
document.querySelector(".btn-hold").addEventListener("click", holdBtn);
document.querySelector(".btn-new").addEventListener("click", newGame);

function rollDiceBtn() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    console.log(dice, dice2);

    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    var dice2DOM = document.querySelector(".dice2");
    dice2DOM.style.display = "block";
    dice2DOM.src = "dice-" + dice2 + ".png";

    if (dice !== 1 && dice2 !== 1) {
      roundScore += dice + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayerTurn();
      alert("You rolled a one! Too bad :^)");
    }

    switch (true) {
      case dice == 6 && lastDice == 6:
        alert("Crazy 6's");
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
        nextPlayerTurn();
        break;
      case dice + dice2 == 12:
        alert("Crazy 6's");
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
        nextPlayerTurn();
        break;
      default:
      // alert("You rolled a one! Too bad :^)");
    }
    lastDice = dice;
  }
}

function holdBtn() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".scoreboard").style.display = "block";
      document.querySelector(".scoreboard").value = "none";

      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document.querySelector(".btn-roll").style.display = "none";
      document.querySelector(".btn-hold").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];

      alert("Player " + (activePlayer + 1) + " has won!");

      gamePlaying = false;
    } else {
      nextPlayerTurn();
    }
  }
}

function nextPlayerTurn() {
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function myFunction() {
  document.querySelector(".gameStarted").style.display = "none";
  document.querySelector(".leaderboard").style.display = "block";

  var x = document.getElementById("frm1");
  var text = "";
  var i;
  for (i = 0; i < x.length; i++) {
    text += x.elements[i].value + "<br>";
  }
  $(".scores").append("<p>" + scores[activePlayer] + " : " + text + "</p>");
}

function newGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".scoreboard").style.display = "none";

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
}
