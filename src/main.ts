import './style.css'
import { SettingsBar } from './components/SettingsBar/SettingsBar.ts';
import { Grid } from './components/Grid/Grid.ts';
import { GRID_CELL_HEIGHT, GRID_CELL_WIDTH, GRID_COL_COUNT, GRID_LINE_WIDTH, GRID_ROW_COUNT } from './constants.ts';
import { gameManager } from './store/gameManager.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div id="root"></div>`;
export const root = document.querySelector('#root') as HTMLDivElement;

SettingsBar();
Grid({
    countCol: GRID_COL_COUNT,
    countRow: GRID_ROW_COUNT,
    cellHeight: GRID_CELL_HEIGHT,
    cellWidth: GRID_CELL_WIDTH,
    lineWidth: GRID_LINE_WIDTH,
});
gameManager.setup();
