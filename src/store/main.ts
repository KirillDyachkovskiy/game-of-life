import { GRID_COL_COUNT, GRID_ROW_COUNT } from "../constants";
import { createMatrix } from "../utils/array/createMatrix";
import { Observer } from "../utils/observer";

export const isPausedState = new Observer({initialValue: false});
export const gridState = new Observer<boolean[][]>({initialValue: createMatrix<boolean>({countRow: GRID_ROW_COUNT, countCol: GRID_COL_COUNT, defaultValue: false})});
