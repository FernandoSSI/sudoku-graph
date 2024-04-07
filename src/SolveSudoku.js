
export function createEmptyMatrix(rows, cols) {
    let mat = []
    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < cols; j++) {
            row.push(0)
        }
        mat.push(row)
    }

    return mat;
}

function verifyEmptySudoku(mat) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (mat[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}

function validation(mat, n, row, col) {

    if (mat[row][col] === n) {
        return false;
    }

    // verify in row
    for (let i = 0; i < 9; i++) {
        if (mat[row][i] === n) {
            return false;
        }
    }

    // verify in column
    for (let i = 0; i < 9; i++) {
        if (mat[i][col] === n) {
            return false;
        }
    }

    //verify in subsquare
    const subgridStartRow = Math.floor(row / 3) * 3;
    const subgridStartCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (mat[subgridStartRow + i][subgridStartCol + j] === n) {
                return false;
            }
        }
    }

    return true
}


export function solveSudoku(sudokuMat) {

    let empty = verifyEmptySudoku(sudokuMat);

    if (!empty) {
        return true;
    }

    const [row, col] = empty;

    for (let num = 1; num <= 9; num++) {
        if (validation(sudokuMat, num, row, col)) {
            sudokuMat[row][col] = num;

            if (solveSudoku(sudokuMat)) {
                return true;
            }

            sudokuMat[row][col] = 0;
        }
    }

    return false;
}