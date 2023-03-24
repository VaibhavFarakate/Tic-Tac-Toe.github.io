let playAudio = new Audio("mixkit-gearbox-working-2046.wav");
let gameover = new Audio("mixkit-musical-game-over-959.wav");
let tie = new Audio("mixkit-game-over-trombone-1940.wav");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const resetBtn = document.querySelector("#resetBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    resetBtn.addEventListener("click", resetGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    playAudio.play();
    cellUpdate(this, cellIndex);
    checkWinner();
}

function cellUpdate(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer() {
    currentPlayer = (currentPlayer == "x") ? "o" : "x";
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            gameover.play();
            document.querySelector(".Gif").getElementsByTagName('img')[0].style.width = "250px";
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!!`;
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = "Game Draw !";
        tie.play();
        running = false;
    }
    else {
        changePlayer();
    }
}

function resetGame() {
    currentPlayer = "x";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = `${currentPlayer}'s Turn`;
    document.querySelector(".Gif").getElementsByTagName('img')[0].style.width = "0px";
    running = true;
}