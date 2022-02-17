function returnZeroMatrix() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
}

let gameMatrix = returnZeroMatrix();
const rowLength = gameMatrix.length;

const numbers = document.querySelectorAll(".board__number");

function renderNumbers() {
    /*     debugger; */
    let i = 0;
    gameMatrix.forEach((row) => {
        row.forEach((item) => {
            numbers[i++].textContent = item;
        });
    });
}

// for (let i = 0; i < rowLength; i++) {
//     for (let j = 0; j < rowLength; j++) {

//     }
// }
// function getRandom() {
//     return Math.floor(Math.random()*4);
// }

// function getRandomPos() {
//     return [getRandom(), getRandom()];
// }

function isEmty(rowIndex, colIndex) {
    return !gameMatrix[rowIndex][colIndex] && true;
}

function getRandomPos() {
    let zeros = [];
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (!gameMatrix[i][j]) {
                zeros.push("" + i + j);
            }
        }
    }
    return zeros[Math.floor(Math.random() * zeros.length)].split("");
}

function addNewNumbers() {
    let [rowIndex, colIndex] = getRandomPos();
    while (!isEmty(rowIndex, colIndex)) {
        [rowIndex, colIndex] = getRandomPos();
    }
    gameMatrix[rowIndex][colIndex] = 2;
}

function translateLeft() {
    const newMatrix = returnZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = 0;
        for (let j = 0; j < rowLength; j++) {
            if (gameMatrix[i][j]) {
                newMatrix[i][newColIndex++] = gameMatrix[i][j];
            }
        }
    }
    return newMatrix;
}

function translateRight() {
    const newMatrix = returnZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = rowLength - 1;
        for (let j = rowLength - 1; j >= 0; j--) {
            if (gameMatrix[i][j]) {
                newMatrix[i][newColIndex--] = gameMatrix[i][j];
            }
        }
    }
    return newMatrix;
}

function translateTop() {
    const newMatrix = returnZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = 0;
        for (let j = 0; j < rowLength; j++) {
            if (gameMatrix[j][i]) {
                newMatrix[newColIndex++][i] = gameMatrix[j][i];
            }
        }
    }
    return newMatrix;
}

function translateBottom() {
    const newMatrix = returnZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = rowLength - 1;
        for (let j = rowLength - 1; j >= 0; j--) {
            if (gameMatrix[j][i]) {
                newMatrix[newColIndex--][i] = gameMatrix[j][i];
            }
        }
    }
    return newMatrix;
}

function copyGameMatrix() {
    const newMatrix = returnZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            newMatrix[i][j] = gameMatrix[i][j];
        }
    }
    return newMatrix;
}


window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft" || e.key.toLowerCase() == "a") {
        gameMatrix = translateLeft();
/*         gameMatrix = getSum(); */
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight" || e.key.toLowerCase() == "d") {
        gameMatrix = translateRight();
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowUp" || e.key.toLowerCase() == "w") {
        gameMatrix = translateTop();
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowDown" || e.key.toLowerCase() == "s") {
        gameMatrix = translateBottom();
        renderNumbers();
    }
})

function getSum() {
    const newMatrix = copyGameMatrix();
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = rowLength - 1;
        for (let j = 0; j < rowLength - 1; j++) {
            if (gameMatrix[i][j] && (gameMatrix[i][j] == gameMatrix[i][j + 1])) {
                newMatrix[i][j] = gameMatrix[i][j] * 2;
                newMatrix[i][j + 1] = 0;
            }
        }
    }
    return newMatrix;
}

addNewNumbers();
addNewNumbers();
addNewNumbers();
addNewNumbers();

renderNumbers(gameMatrix);
