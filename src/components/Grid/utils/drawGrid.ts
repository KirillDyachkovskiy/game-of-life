interface DrawGridProps {
    cellWidth: number;
    cellHeight: number;
    countRow: number;
    countCol: number;
    canvas: HTMLCanvasElement;
    styles?: Partial<{
        backgroundColor: string;
        linesColor: string;
        lineWidth: number;
    }>;
}

export const drawGrid = ({cellHeight, cellWidth, countCol, countRow, canvas, styles = {}}: DrawGridProps) => {
    const {linesColor = '', lineWidth = 1, backgroundColor = 'black'} = styles;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const height = countRow * cellHeight + lineWidth;
    const width = countCol * cellWidth + lineWidth;

    canvas.height = height;
    canvas.width = width;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();

    for (let rowIdx = 0; rowIdx < countRow + 1; rowIdx++) {
        const y = rowIdx * cellWidth + lineWidth / 2;

        ctx.moveTo(0, y);
        ctx.lineTo(cellWidth * countCol, y);
    }

    for (let colIdx = 0; colIdx < countCol + 1; colIdx++) {
        const x = colIdx * cellHeight + lineWidth / 2;

        ctx.moveTo(x, 0);
        ctx.lineTo(x, cellHeight * countRow);
    }

    ctx.strokeStyle = linesColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}
