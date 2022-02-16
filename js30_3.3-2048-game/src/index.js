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

function translateLeft(mas) {
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = 0;
        for (let j = 0; j < rowLength; j++) {
            if (mas[i][j]) {
                mas[i][newColIndex++] = mas[i][j];
                if (j) {
                    mas[i][j] = 0;
                }
            }
        }
    }
}

function translateRight(mas) {
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = rowLength - 1;
        for (let j = rowLength - 1; j >= 0; j--) {
            if (mas[i][j]) {
                mas[i][newColIndex--] = mas[i][j];
                if (j != rowLength - 1) {
                    mas[i][j] = 0;
                }
            }
        }
    }
}

function translateTop(mas) {
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = 0;
        for (let j = 0; j < rowLength; j++) {
            if (mas[j][i]) {
                mas[newColIndex++][i] = mas[j][i];
                if (j) {
                    mas[j][i] = 0;
                }
            }
        }
    }
}

function translateBottom(mas) {
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = rowLength - 1;
        for (let j = rowLength - 1; j >= 0; j--) {
            if (mas[j][i]) {
                mas[newColIndex--][i] = mas[j][i];
                if (j != rowLength - 1) {
                    mas[j][i] = 0;
                }
            }
        }
    }
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

function toLeft() {
    const newMatrix = copyGameMatrix();
    translateLeft(newMatrix);
    return newMatrix;
}

function toRight() {
    const newMatrix = copyGameMatrix();
    translateRight(newMatrix);
    return newMatrix;
}

function toTop() {
    const newMatrix = copyGameMatrix();
    translateTop(newMatrix);
    return newMatrix;
}

function toBottom() {
    const newMatrix = copyGameMatrix();
    translateBottom(newMatrix);
    return newMatrix;
}


window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft" || e.key.toLowerCase() == "a") {
        gameMatrix = toLeft();
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight" || e.key.toLowerCase() == "d") {
        gameMatrix = toRight();
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowUp" || e.key.toLowerCase() == "w") {
        gameMatrix = toTop();
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowDown" || e.key.toLowerCase() == "s") {
        gameMatrix = toBottom();
        renderNumbers();
    }
})

addNewNumbers();
addNewNumbers();

renderNumbers(gameMatrix);
