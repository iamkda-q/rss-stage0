function getZeroMatrix() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
}

let gameMatrix = getZeroMatrix();
const rowLength = gameMatrix.length;
let previousMatrix = getZeroMatrix();
const numbers = document.querySelectorAll(".board__number");
const popup = document.querySelector(".board__popup");
const popupText = popup.querySelector(".board__popup-text");
const popupButton = popup.querySelector(".board__popup-button");
const scoreCurrent = document.querySelector(".score-board__score_current");
const scoreBest = document.querySelector(".score-board__score_best");
let gameOver = false;
let win = false;

function startNewGame() {
    gameMatrix = getZeroMatrix();
    gameOver = false;
    win = false;
    scoreCurrent.textContent = 0;
    addNewNumbers();
    addNewNumbers();
    renderNumbers();
    rememberMatrix();
}

function renderNumbers() {
    let i = 0;
    gameMatrix.forEach((row) => {
        row.forEach((item) => {
            numbers[i++].textContent = item;
        });
    });
}

function addNewNumbers() {
    let zeros = [];
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (!gameMatrix[i][j]) {
                zeros.push("" + i + j);
            }
        }
    }

    if (!zeros.length) {
        return;
    }

    let [rowIndex, colIndex] =
        zeros[Math.floor(Math.random() * zeros.length)].split("");
    gameMatrix[rowIndex][colIndex] = 2;
}

function translateLeft(matrix) {
    const newMatrix = getZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = 0;
        for (let j = 0; j < rowLength; j++) {
            if (matrix[i][j]) {
                newMatrix[i][newColIndex++] = matrix[i][j];
            }
        }
    }
    return newMatrix;
}
/* 
const vv = document.querySelector(".vv"); */

function getSum(matrix, noScore = false) {
    const newMatrix = getZeroMatrix();
/*     debugger; */
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (matrix[i][j]) {
                if (matrix[i][j] == matrix[i][j + 1]) {
                    newMatrix[i][j] = matrix[i][j] * 2;
                    if (!noScore) {
                        scoreCurrent.textContent = +scoreCurrent.textContent + matrix[i][j] * 2;
                        if (+scoreCurrent.textContent > +scoreBest.textContent) {
                            scoreBest.textContent = scoreCurrent.textContent;
                            localStorage.setItem("bestResult", scoreCurrent.textContent);
                        }
                        if (!win && newMatrix[i][j] == 16) {
                            win = true;
                            showWinPopup();
                        }
/*                         if (newMatrix[i][j] == 16) {
                            vv.setAttribute("data-number", 16)
                        }
                        if (newMatrix[i][j] == 8) {
                            vv.setAttribute("data-number", 8)
                        } */
                    }
                    j++;
                } else {
                    newMatrix[i][j] = matrix[i][j];
                }
            }
        }
    }
    return newMatrix;
}

function getMirrorMatrix(matrix) {
    const newMatrix = getZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            newMatrix[i][j] = matrix[i][rowLength - 1 - j];
        }
    }
    return newMatrix;
}

function getTransporMatrix(matrix) {
    const newMatrix = getZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            newMatrix[i][j] = matrix[j][i];
        }
    }
    return newMatrix;
}

function toLeft(matrix, noScore) {
    return translateLeft(getSum(translateLeft(matrix), noScore));
}

function toRight(matrix, noScore) {
    return getMirrorMatrix(toLeft(getMirrorMatrix(matrix), noScore));
}

function toTop(matrix, noScore) {
    return getTransporMatrix(toLeft(getTransporMatrix(matrix), noScore));
}

function toBottom(matrix, noScore) {
    return getTransporMatrix(toRight(getTransporMatrix(matrix), noScore));
}

function rememberMatrix() {
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            previousMatrix[i][j] = gameMatrix[i][j];
        }
    }
}

function isEqualMatrix(m1, m2) {
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (m1[i][j] != m2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function isFull() {
    let newMatrix = toLeft(gameMatrix, true);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    newMatrix = toRight(gameMatrix, true);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    newMatrix = toTop(gameMatrix, true);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    newMatrix = toBottom(gameMatrix, true);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    return true
}

function showWinPopup() {
    popupText.textContent = "You win!";
    popupButton.textContent = "Continue";
    popup.classList.add("board__popup_visible");
    popupButton.addEventListener("click", continueGame)
}


function checkEndGame() {
    if (isFull()) {
        gameOver = !gameOver;
        popupText.textContent = "Game over!";
        popupButton.textContent = "Try again";
        popup.classList.add("board__popup_visible");
        popupButton.addEventListener("click", finishGame);
    }
}

function continueGame() {
    popup.classList.remove("board__popup_visible");
    popupButton.removeEventListener("click", continueGame);
}

function finishGame() {
    popup.classList.remove("board__popup_visible");
    popupButton.removeEventListener("click", finishGame);
    startNewGame();
}




/* buttonTryAgain.addEventListener("click", (evt) => {
    popup.classList.remove("board__popup_visible");
    startNewGame();
}); */



window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft" || e.code.toLowerCase() == "keya") {
        if (gameOver) {
            return
        }
        rememberMatrix();
        gameMatrix = toLeft(gameMatrix);
        if (!isEqualMatrix(previousMatrix, gameMatrix)) {
            addNewNumbers();
            checkEndGame();
        }
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight" || e.code.toLowerCase() == "keyd") {
        if (gameOver) {
            return
        }
        rememberMatrix();
        gameMatrix = toRight(gameMatrix);
        if (gameOver) {
            return
        }
        if (!isEqualMatrix(previousMatrix, gameMatrix)) {
            addNewNumbers();
            checkEndGame();
        }
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowUp" || e.code.toLowerCase() == "keyw") {
        if (gameOver) {
            return
        }
        rememberMatrix();
        gameMatrix = toTop(gameMatrix);
        if (gameOver) {
            return
        }
        if (!isEqualMatrix(previousMatrix, gameMatrix)) {
            addNewNumbers();
            checkEndGame();
        }
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowDown" || e.code.toLowerCase() == "keys") {
        if (gameOver) {
            return
        }
        rememberMatrix();
        gameMatrix = toBottom(gameMatrix);
        if (!isEqualMatrix(previousMatrix, gameMatrix)) {
            addNewNumbers();
            checkEndGame();
        }
        renderNumbers();
    }
});

startNewGame();

if (!localStorage.getItem("bestResult")) {
    localStorage.setItem("bestResult", 0);
}
scoreBest.textContent = localStorage.getItem("bestResult");
    
