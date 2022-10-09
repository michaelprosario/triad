export class TriadGridCell
{
    cellValue: number;
    minimize: boolean;
    constructor()
    {
        this.cellValue = 0;
        this.minimize = false;
    }
}

export class TriadGameGrid {
    findCellsToMinimize() {
      
    }

    grid: Array<Array<TriadGridCell>> = [];
    rows: number = 0;
    columns: number = 0;

    constructor() {

    }

    setupGameGrid(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;

        this.makeEmptyGrid();
    }

    setCellValue(row: number, column: number ,cellValue: number)
    {
        console.log(row + ',' + column);
        this.grid[row][column].cellValue = cellValue;
    }

    getCellValue(row: number, column: number)
    {
        return this.grid[row][column].cellValue;
    }

    getCell(row: number, column: number)
    {
        return this.grid[row][column];
    }    

    private makeEmptyGrid() {
        this.grid = [];
        for (let row: number = 0; row < this.rows; row++) {
            let colArray: Array<TriadGridCell> = [];
            for (let column: number = 0; column < this.columns; column++) {
                colArray[column] = new TriadGridCell();
            }

            this.grid[row] = colArray;
        }
    }
}