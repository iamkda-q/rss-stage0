const numbers = document.querySelectorAll(".board__number");
const popupEndGame = document.querySelector(".popup_type_end-game");
const popupCongr = popupEndGame.querySelector(".popup__message_congr");
const popupScore = popupEndGame.querySelector(".popup__message_score");
const popupButton = popupEndGame.querySelector(".popup__button");
const scoreCurrent = document.querySelector(".board__score_current");
const scoreBest = document.querySelector(".board__score_best");
const startButton = document.querySelector(".board__button_start");
const resultsButton = document.querySelector(".board__button_result");
const popupResults = document.querySelector(".popup_type_results");
const popupCloseButton = document.querySelector(".popup__close-button");
const results = document.querySelectorAll(".popup__text_score");
const resultsBest = document.querySelectorAll(".popup__text_best");
const knockSound = document.querySelector("#knock-sound");
const winSound = document.querySelector("#win-sound");
const falseSound = document.querySelector("#false-sound");

let gameMatrix = getZeroMatrix();
const rowLength = gameMatrix.length;
let previousMatrix = getZeroMatrix();
let [firstFlag, secondFlag] = [true, true]; // для топа трёх результатов
let gameOver;
let win;
let gamesPosition;

function getZeroMatrix() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
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

/* поиск нулевых значений => добавление их позиций в массив => извлечение случайной позиции => добавление туда двойки*/
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

function getSum(matrix, noScore = false) {
    const newMatrix = getZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (matrix[i][j]) {
                if (matrix[i][j] == matrix[i][j + 1]) {
                    newMatrix[i][j] = matrix[i][j] * 2;
                    /* при запуске с флагом noScore не обновляются набранные очки и таблицы результатов */
                    /* используется при проверке на gameOver */
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
                        if (!win && newMatrix[i][j] == 128) {
                            win = true;
                            winSound.play();
                            showWinPopup();
                        }
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

/* Проверка на возможность продолжения игры */
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
    /* для обновления результата текущей игры в реальном времени в таблице результатов*/
    gamesPosition =
        resultsData.length == 10 ? resultsData.length - 1 : resultsData.length; // поиск незаполненной строки в таблице последних игр
    /* если 10 игр уже сыграно - при старте новой игры сдвигаем результаты*/
    if (resultsData[gamesPosition]) {
        resultsData.shift();
        resultsData.push(0);
        saveResults();
        renderResults();
    }
}

/* Действия при окончании игры */
function showWinPopup() {
    popupCongr.textContent = "You win!";
    popupScore.textContent = `Score: ${scoreCurrent.textContent}`;
    popupButton.textContent = "Continue";
    popupEndGame.classList.add("popup_visible");
    popupButton.addEventListener("click", continueGame);
    removeEventListeners();
}

function checkEndGame() {
    if (isFull()) {
        gameOver = !gameOver;
        popupCongr.textContent = `Game over!`;
        popupScore.textContent = `Score: ${scoreCurrent.textContent}`;
        popupButton.textContent = "Try again";
        popupEndGame.classList.add("popup_visible");
        popupButton.addEventListener("click", finishGame);
        falseSound.play();
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
/* Действия при окончании игры */

/* Действия при нажатии на управляющие клавиши */
function action(method) {
    if (gameOver) {
        return;
    }
    rememberMatrix();
    gameMatrix = method(gameMatrix);
    if (!isEqualMatrix(previousMatrix, gameMatrix)) {
        knockSound.play();
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
        action(toRight);
    }
}

function topAction(e) {
    if (e.key == "ArrowUp" || e.code.toLowerCase() == "keyw") {
        action(toTop);
    }
}

function bottomAction(e) {
    if (e.key == "ArrowDown" || e.code.toLowerCase() == "keys") {
        action(toBottom);
    }
}
/* Действия при нажатии на управляющие клавиши */

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

/* Работа с localStorage */
/* Создание данных для таблицы результатов при первой загрузке страницы */
let resultsData;
let resultsBestData;

if (localStorage.getItem("resultsBestData")) {
    resultsBestData = JSON.parse(localStorage.getItem("resultsBestData"));
    renderBestResults();
} else {
    localStorage.setItem("resultsBestData", JSON.stringify([0, 0, 0]));
    resultsBestData = JSON.parse(localStorage.getItem("resultsBestData"));
}

if (localStorage.getItem("resultsData")) {
    resultsData = JSON.parse(localStorage.getItem("resultsData"));
    renderResults();
} else {
    localStorage.setItem("resultsData", JSON.stringify([]));
    resultsData = JSON.parse(localStorage.getItem("resultsData"));
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
        item.textContent = resultsBestData[i] + " points";
    });
}

scoreBest.textContent = resultsBestData[0]; // отображение лучшего результата
renderResults();
renderBestResults();

console.log(
    `
    Правила игры: нажатием клавиш W S A D или стрелок набрать в одном из игровых квадратиков 2048 
    (сейчас выигрыш засчитывается при наборе 128, а не 2048 для удобства проверки проверяющего)
    Если свободных квадратиков не осталось, и при этом нет возможности сдвинуть игровое поле - вы проиграли.


    "Самооценка для проверяющего"
Score: 57 / 60.

[10/10] - Вёрстка
- [+] реализован интерфейс игры (+5)
- [+] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (+5)

[10/10] - Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам

[10/10] - Реализовано завершение игры при достижении игровой цели

[10/10] - По окончанию игры выводится её результат, набранные баллы, выигрыш или поражение

[10/10] - Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр

[2/10] - Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов
        (добавил парочку звуков, но не успел разобраться с организацией анимаций в игре, перемещение, сложение и тд.)

[5/10] - Дополнительно
- [+] Адаптивная верстка
- [+] Отображение текущего и лучшего результатов в режиме реального времени
- [+] Топ 3 результата за все игры в таблице результатов
    `
);
