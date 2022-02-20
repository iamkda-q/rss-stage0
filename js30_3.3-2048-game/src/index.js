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
const popupEndGame = document.querySelector(".popup_type_end-game");
const popupMessage = popupEndGame.querySelector(".popup__message");
const popupButton = popupEndGame.querySelector(".popup__button");
const scoreCurrent = document.querySelector(".board__score_current");
const scoreBest = document.querySelector(".board__score_best");
const startButton = document.querySelector(".board__button_start");
const resultsButton = document.querySelector(".board__button_result");
const popupResults = document.querySelector(".popup_type_results");
const popupCloseButton = document.querySelector(".popup__close-button");
const results = document.querySelectorAll(".popup__text_score");
const resultsBest = document.querySelectorAll(".popup__text_best");
let [firstFlag, secondFlag] = [true, true];
let gameOver;
let win;
let gamesPosition;

function startNewGame() {
    gameMatrix = getZeroMatrix();
    gameOver = false;
    win = false;
    scoreCurrent.textContent = 0;
    addNewNumbers();
    addNewNumbers();
    renderNumbers();
    rememberMatrix();
    addEventListeners();
    gamesPosition = resultsData.length == 10 ? resultsData.length - 1 : resultsData.length;
    if (resultsData[gamesPosition]) {
        resultsData.shift();
        resultsData.push(0);
        saveResults();
        renderResults();
    }
}

function renderNumbers() {
    let i = 0;
    gameMatrix.forEach((row) => {
        row.forEach((item) => {
            if (item) {
                numbers[i].setAttribute("data-number", item);
            } else {
                numbers[i].removeAttribute("data-number");
            }
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
                        const score =
                            +scoreCurrent.textContent + matrix[i][j] * 2;
                        scoreCurrent.textContent = score;
                        results[gamesPosition].textContent = score + " points";
                        resultsData[gamesPosition] = score;
                        saveResults();
                        if (score > resultsBestData[0]) {
                            if (firstFlag) {
                                firstFlag = !firstFlag;
                                resultsBestData[1] = resultsBestData[0];
                            }
                            resultsBestData[0] = score;
                            scoreBest.textContent = score;
                            saveBestResults();
                            renderBestResults();
                        } else if (score > resultsBestData[1]) {
                            if (secondFlag) {
                                secondFlag = !secondFlag;
                                resultsBestData[2] = resultsBestData[1];
                            }
                            resultsBestData[1] = score;
                            saveBestResults();
                            renderBestResults();
                        } else if (score > resultsBestData[2]) {
                            resultsBestData[2] = score;
                            saveBestResults();
                            renderBestResults();
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
        return false;
    }
    newMatrix = toRight(gameMatrix, true);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false;
    }
    newMatrix = toTop(gameMatrix, true);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false;
    }
    newMatrix = toBottom(gameMatrix, true);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false;
    }
    return true;
}

function showWinPopup() {
    popupMessage.textContent = "You win!";
    popupButton.textContent = "Continue";
    popupEndGame.classList.add("popup_visible");
    popupButton.addEventListener("click", continueGame);
    removeEventListeners();
}

function checkEndGame() {
    if (isFull()) {
        gameOver = !gameOver;
        popupMessage.textContent = "Game over!";
        popupButton.textContent = "Try again";
        popupEndGame.classList.add("popup_visible");
        popupButton.addEventListener("click", finishGame);
    }
}

function continueGame() {
    popupEndGame.classList.remove("popup_visible");
    popupButton.removeEventListener("click", continueGame);
    addEventListeners();
}

function finishGame() {
    popupEndGame.classList.remove("popup_visible");
    popupButton.removeEventListener("click", finishGame);
    startNewGame();
}

function action(method) {
    if (gameOver) {
        return;
    }
    rememberMatrix();
    gameMatrix = method(gameMatrix);
    if (!isEqualMatrix(previousMatrix, gameMatrix)) {
        addNewNumbers();
        checkEndGame();
    }
    renderNumbers();
}

function leftAction(e) {
    if (e.key == "ArrowLeft" || e.code.toLowerCase() == "keya") {
        action(toLeft);
    }
}

function rightAction(e) {
    if (e.key == "ArrowRight" || e.code.toLowerCase() == "keyd") {
        if (gameOver) {
            return;
        }
        rememberMatrix();
        gameMatrix = toRight(gameMatrix);
        if (gameOver) {
            return;
        }
        if (!isEqualMatrix(previousMatrix, gameMatrix)) {
            addNewNumbers();
            checkEndGame();
        }
        renderNumbers();
    }
}

function topAction(e) {
    if (e.key == "ArrowUp" || e.code.toLowerCase() == "keyw") {
        if (gameOver) {
            return;
        }
        rememberMatrix();
        gameMatrix = toTop(gameMatrix);
        if (gameOver) {
            return;
        }
        if (!isEqualMatrix(previousMatrix, gameMatrix)) {
            addNewNumbers();
            checkEndGame();
        }
        renderNumbers();
    }
}

function bottomAction(e) {
    if (e.key == "ArrowDown" || e.code.toLowerCase() == "keys") {
        if (gameOver) {
            return;
        }
        rememberMatrix();
        gameMatrix = toBottom(gameMatrix);
        if (!isEqualMatrix(previousMatrix, gameMatrix)) {
            addNewNumbers();
            checkEndGame();
        }
        renderNumbers();
    }
}

function addEventListeners() {
    window.addEventListener("keyup", leftAction);
    window.addEventListener("keyup", rightAction);
    window.addEventListener("keyup", topAction);
    window.addEventListener("keyup", bottomAction);
}

function removeEventListeners() {
    window.removeEventListener("keyup", leftAction);
    window.removeEventListener("keyup", rightAction);
    window.removeEventListener("keyup", topAction);
    window.removeEventListener("keyup", bottomAction);
}

function saveResults() {
    localStorage.setItem("resultsData", JSON.stringify(resultsData));
}

function saveBestResults() {
    localStorage.setItem("resultsBestData", JSON.stringify(resultsBestData));
}

function renderResults() {
    results.forEach((item, i) => {
        item.textContent = resultsData[i]
            ? resultsData[i] + " points"
            : "Waiting for the game";
    });
}

function renderBestResults() {
    resultsBest.forEach((item, i) => {
        item.textContent = resultsBestData[i]
            ? resultsBestData[i] + " points"
            : 0;
    });
}

startButton.addEventListener("click", () => {
    startNewGame();
    startButton.blur();
});

resultsButton.addEventListener("click", () => {
    popupResults.classList.add("popup_visible");
    removeEventListeners();
});

popupCloseButton.addEventListener("click", () => {
    popupResults.classList.remove("popup_visible");
    addEventListeners();
});

let resultsData;
let resultsBestData;

if (localStorage.getItem("resultsBestData")) {
    resultsBestData = JSON.parse(localStorage.getItem("resultsBestData"));
    renderBestResults();
} else {
    localStorage.setItem("resultsBestData", JSON.stringify([0, 0, 0]));
    resultsBestData = JSON.parse(localStorage.getItem("resultsBestData"));
}

scoreBest.textContent = resultsBestData[0];

if (localStorage.getItem("resultsData")) {
    resultsData = JSON.parse(localStorage.getItem("resultsData"));
    renderResults();
} else {
    localStorage.setItem("resultsData", JSON.stringify([]));
    resultsData = JSON.parse(localStorage.getItem("resultsData"));
}



renderResults();
renderBestResults();

console.log(resultsBestData);
