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
let gameOver = false;

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

function getSum(matrix) {
    const newMatrix = getZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (matrix[i][j]) {
                if (matrix[i][j] == matrix[i][j + 1]) {
                    newMatrix[i][j] = matrix[i][j] * 2;
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

function toLeft(matrix) {
    return translateLeft(getSum(translateLeft(matrix)));
}

function toRight(matrix) {
    return getMirrorMatrix(toLeft(getMirrorMatrix(matrix)));
}

function toTop(matrix) {
    return getTransporMatrix(toLeft(getTransporMatrix(matrix)));
}

function toBottom(matrix) {
    return getTransporMatrix(toRight(getTransporMatrix(matrix)));
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
    let newMatrix = toLeft(gameMatrix);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    newMatrix = toRight(gameMatrix);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    newMatrix = toTop(gameMatrix);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    newMatrix = toBottom(gameMatrix);
    if (!isEqualMatrix(newMatrix, gameMatrix)) {
        return false
    }
    return true
}

function checkEndGame(m1, m2) {
    if (isFull()) {
        console.log("Game Over");
        gameOver = !gameOver;
    }
}

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft" || e.key.toLowerCase() == "a") {
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
    if (e.key == "ArrowRight" || e.key.toLowerCase() == "d") {
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
    if (e.key == "ArrowUp" || e.key.toLowerCase() == "w") {
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
    if (e.key == "ArrowDown" || e.key.toLowerCase() == "s") {
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


addNewNumbers();
addNewNumbers();
renderNumbers();
rememberMatrix();
