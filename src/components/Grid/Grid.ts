import { root } from '../../main';
import { gridState } from '../../store/main';
import { drawGrid } from './utils/drawGrid';
import { updateGrid } from './utils/updateGrid';

const CANVAS_ID = 'temp_canvas_id';

interface GridProps {
    countCol: number;
    countRow: number;
    cellHeight: number;
    cellWidth: number;
    lineWidth: number;
}

export const Grid = ({countCol, countRow, cellHeight, cellWidth, lineWidth}: GridProps) => {
    const GridCanvas = document.createElement('canvas');
    GridCanvas.id = CANVAS_ID;
    root.appendChild(GridCanvas);

    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    drawGrid({canvas, cellHeight, cellWidth, countCol, countRow, styles: {backgroundColor: 'white', linesColor: 'black', lineWidth}});

    gridState.onUpdate((newGrid, oldGrid) => {
        updateGrid({ctx, newGrid, oldGrid: oldGrid!, cellHeight, cellWidth, styles: {lineWidth}});
    });

    const handleClick = (e: MouseEvent) => {
        const rowIdx = Math.floor(e.pageY / cellHeight);
        const colIdx = Math.floor(e.pageX / cellWidth);

        const matrix = [...gridState.current!].map((row) => [...row]);
        matrix[rowIdx][colIdx] = !matrix[rowIdx][colIdx];
        gridState.current = matrix;
    };

    canvas.addEventListener('click', handleClick);

    return () => {
        canvas.removeEventListener('click', handleClick);
        root.removeChild(GridCanvas);
    }
}
