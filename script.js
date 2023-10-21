let restartBtn = document.querySelector("#restartBtn");
let cells = document.querySelectorAll(".cell");
let statusText = document.querySelector("#status-text");

let options = ["", "", "", "", "", "", "", "", ""];
let isGameDraw = false;
let isGameFinished = false;

let winingOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let playersTurn = "X";

initializeGame();

function initializeGame() {
    statusText.textContent = `Player's ${playersTurn} turns`;
    cells.forEach((c) =>
        c.addEventListener("click", () =>
            cellClicked(c, c.getAttribute("cellIndex"))
        )
    );
    restartBtn.addEventListener("click", restartGame());
}

function cellClicked(cell, cellIndex) {
    if (options[cellIndex] != "") {
        return;
    }
    options[cellIndex] = playersTurn;
    cell.textContent = playersTurn;
    checkWinningCondition(options);
    if (!isGameFinished && !isGameDraw) {
        playersTurn = changePlayer(playersTurn);
        statusText.textContent = `Player's ${playersTurn} turns`;
    }
}

function changePlayer(playersTurn) {
    let changedPlayersTurn =
        playersTurn === "X" ? (playersTurn = "O") : (playersTurn = "X");
    return changedPlayersTurn;
}

function checkWinningCondition(options) {
    winingOptions.forEach((arr) => isWinned(arr));
}

function isWinned(arr) {
    let a = options[arr[0]];
    let b = options[arr[1]];
    let c = options[arr[2]];

    if (a === b && b === c && a != "" && b != "" && c != "") {
        endGame(playersTurn, arr);
    } else if (!options.includes("") && !isGameFinished) {
        isGameDraw = true;
    }

    if (isGameDraw) {
        statusText.textContent = `Match Draw!!!!`;
        cells.forEach((cell) => cellBackgroundColorChange(cell, false));
    } else if (isGameFinished) {
        statusText.textContent = `Player ${playersTurn} won!!!!!`;
    }
    restartBtn.addEventListener("click", () => restartGame());
}

function endGame(playersTurn, arr) {
    cells.forEach((cell) => {
        highlightCell(cell, cell.getAttribute("cellIndex"), arr);
    });
}

function highlightCell(cell, cellIndex, arr) {
    let winningCell = arr.includes(parseInt(cellIndex));

    cellBackgroundColorChange(cell, winningCell);
}

function cellBackgroundColorChange(cell, isCellWinnerCell) {
    if (isCellWinnerCell) {
        cell.classList.add("active");
        cell.style.pointerEvents = "none";
        isGameFinished = true;
    } else {
        cell.classList.add("deactive");
        cell.style.pointerEvents = "none";
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    playersTurn = "X";
    cells.forEach((cell) => removedToDefault(cell));
    isGameDraw = false;
    isGameFinished = false;
    statusText.textContent = `Player's ${playersTurn} turns`;
}

function removedToDefault(cell) {
    cell.textContent = "";
    cell.classList.remove("active");
    cell.classList.remove("deactive");
    cell.style.pointerEvents = "";
}
