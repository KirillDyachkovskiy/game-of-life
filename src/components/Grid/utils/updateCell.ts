interface UpdateCellProps {
    cellWidth: number;
    cellHeight: number;
    colIdx: number;
    rowIdx: number;
    ctx: CanvasRenderingContext2D;
    styles?: Partial<{
        backgroundColor: string;
        lineWidth: number;
    }>;
}

export const updateCell = ({ctx, cellHeight, cellWidth, colIdx, rowIdx, styles = {}}: UpdateCellProps) => {
    const {lineWidth = 1, backgroundColor = 'green'} = styles;

    const x = cellWidth * colIdx + lineWidth;
    const y = cellHeight * rowIdx + lineWidth;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, cellWidth - lineWidth, cellHeight - lineWidth);
}
