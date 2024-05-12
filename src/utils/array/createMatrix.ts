interface CreateMatrixProps<T> {
    countRow: number;
    countCol?: number;
    defaultValue: T;
}

export const createMatrix = <T>({countRow, countCol = countRow, defaultValue}: CreateMatrixProps<T>): T[][] => {
    return Array.from({length: countRow}).map(() => Array.from({length: countCol}).map(() => defaultValue));
}
