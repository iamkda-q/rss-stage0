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

/* function isEmty(rowIndex, colIndex) {
    return !gameMatrix[rowIndex][colIndex] && true;
} */

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
        return
    }

    let [rowIndex, colIndex] = zeros[Math.floor(Math.random() * zeros.length)].split("");
    gameMatrix[rowIndex][colIndex] = 2;
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

/* function translateRight() {
    const mirrorMatrix = getMirrorMatrix(gameMatrix);
    const newMatrix = translateLeft(mirrorMatrix);
    return getMirrorMatrix(newMatrix);
} */

/* function translateTop() {
    const newMatrix = getZeroMatrix();
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
    const newMatrix = getZeroMatrix();
    for (let i = 0; i < rowLength; i++) {
        let newColIndex = rowLength - 1;
        for (let j = rowLength - 1; j >= 0; j--) {
            if (gameMatrix[j][i]) {
                newMatrix[newColIndex--][i] = gameMatrix[j][i];
            }
        }
    }
    return newMatrix;
} */

let previousMatrix = getZeroMatrix();
rememberMatrix();

function rememberMatrix() {
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            previousMatrix[i][j] = gameMatrix[i][j];
        }
    }
}

function isEqualMatrix() {
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (previousMatrix[i][j] != gameMatrix[i][j]) {
                return false
            }
        }
    }
    return true
}

window.addEventListener("keyup", (e) => {
/*     debugger; */
    if (e.key == "ArrowLeft" || e.key.toLowerCase() == "a") {
        rememberMatrix();
        gameMatrix = translateLeft(getSum(translateLeft(gameMatrix)));
        if (!isEqualMatrix()) {
            addNewNumbers();
        }
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
/*     debugger; */
    if (e.key == "ArrowRight" || e.key.toLowerCase() == "d") {
        rememberMatrix();
        gameMatrix = getMirrorMatrix(
            translateLeft(getSum(translateLeft(getMirrorMatrix(gameMatrix))))
        );
        if (!isEqualMatrix()) {
            addNewNumbers();
        }
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
 /*    debugger; */
    if (e.key == "ArrowUp" || e.key.toLowerCase() == "w") {
        rememberMatrix();
        gameMatrix = getTransporMatrix(
            translateLeft(getSum(translateLeft(getTransporMatrix(gameMatrix))))
        );
        if (!isEqualMatrix()) {
            addNewNumbers();
        }
        renderNumbers();
    }
});

window.addEventListener("keyup", (e) => {
/*     debugger; */
    if (e.key == "ArrowDown" || e.key.toLowerCase() == "s") {
        rememberMatrix();
        gameMatrix = getTransporMatrix(
            getMirrorMatrix(
                translateLeft(
                    getSum(
                        translateLeft(
                            getMirrorMatrix(getTransporMatrix(gameMatrix))
                        )
                    )
                )
            )
        );

        if (!isEqualMatrix()) {
            addNewNumbers();
        }
        renderNumbers();
    }
});

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

addNewNumbers();
addNewNumbers();
renderNumbers();
rememberMatrix();
