import { updateCell } from "./updateCell";

interface UpdateGridProps {
    newGrid: boolean[][];
    oldGrid: boolean[][];
    cellWidth: number;
    cellHeight: number;
    ctx: CanvasRenderingContext2D;
    styles?: Partial<{
        lineWidth: number;
    }>;
}

export const updateGrid = ({newGrid, oldGrid, cellHeight, cellWidth, ctx, styles = {}}: UpdateGridProps) => {
    const {lineWidth = 1} = styles;

    for (let rowIdx = 0; rowIdx < newGrid.length; rowIdx++) {
        for (let colIdx = 0; colIdx < newGrid[rowIdx].length; colIdx++) {
            const newValue = newGrid[rowIdx][colIdx];
            const oldValue = oldGrid[rowIdx][colIdx];

            if (newValue === oldValue) continue;

            updateCell({
                cellHeight,
                cellWidth,
                colIdx,
                ctx,
                rowIdx,
                styles: {
                    // TODO move to constants
                    backgroundColor: newValue ? 'green' : 'white',
                    lineWidth,
                }
            });
        }
    }
}
