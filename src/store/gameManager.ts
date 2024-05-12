import { GRID_COL_COUNT, GRID_ROW_COUNT } from "../constants";
import { createMatrix } from "../utils/array/createMatrix";
import { gridState } from "./main";

interface ProcessGameTickProps {
    countCol: number;
    countRow: number;
}

const processGameTick = ({countCol, countRow}: ProcessGameTickProps) => {
    const oldMatrix = gridState.current!;
    const matrix = createMatrix<boolean>({countRow, countCol, defaultValue: false});

    let isChanged = false;

    for (let rowIdx = 0; rowIdx < countRow; rowIdx++) {
        for (let colIdx = 0; colIdx < countCol; colIdx++) {
            const aliveNeighs = [
                oldMatrix[rowIdx-1]?.[colIdx-1], oldMatrix[rowIdx][colIdx-1], oldMatrix[rowIdx+1]?.[colIdx-1],
                oldMatrix[rowIdx-1]?.[colIdx], oldMatrix[rowIdx+1]?.[colIdx],
                oldMatrix[rowIdx-1]?.[colIdx+1], oldMatrix[rowIdx][colIdx+1], oldMatrix[rowIdx+1]?.[colIdx+1]
            ].filter(Boolean).length;

            const isAlive = oldMatrix[rowIdx][colIdx];
            const isStillAlive = isAlive ? aliveNeighs === 2 || aliveNeighs === 3 : aliveNeighs === 3;

            matrix[rowIdx][colIdx] = isStillAlive;

            isChanged ||= isStillAlive !== oldMatrix[rowIdx][colIdx];
        }
    }

    if (isChanged) {
        gridState.current = matrix;
    }
}

interface GameProps {
    countCol: number;
    countRow: number;
}

class Game {
    private intervalId: number | undefined;
    private countCol: number;
    private countRow: number;

    constructor({countCol, countRow}: GameProps) {
        this.countCol = countCol;
        this.countRow = countRow;
    }

    setup() {
        this.clearInterval();

        this.setInterval();
    }

    pause() {
        this.clearInterval();
    }

    resume() {
        this.clearInterval();

        this.setInterval();
    }

    private setInterval() {
        this.intervalId = setInterval(() => {
            processGameTick({countCol: this.countCol, countRow: this.countRow});
        }, 400);
    }

    private clearInterval() {
        clearInterval(this.intervalId);
    }
}

export const gameManager = new Game({countCol: GRID_COL_COUNT, countRow: GRID_ROW_COUNT});
