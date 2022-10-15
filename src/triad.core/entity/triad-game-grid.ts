import { MathHelper } from "../../playtime.core/helpers/math-helper";

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
    
    grid: Array<Array<TriadGridCell>> = [];
    rows: number = 0;
    columns: number = 0;

    constructor() {

    }

    placeRandomBlocks(blockCount: number)
    {
        this.makeEmptyGrid();
        for(let i=0; i<blockCount; i++)
        {
            let row = MathHelper.randomIntFromInterval(0, this.rows-1);
            let col = MathHelper.randomIntFromInterval(0, this.columns-1);
            if(this.grid[row][col])
            {
                this.grid[row][col].cellValue = MathHelper.randomIntFromInterval(1,5);
            }
        }

        for(let row=0; row< this.rows; row++)
        {
            let col = 0;
            this.grid[row][col].cellValue = 2;
        }

        for(let col=0; col< this.columns; col++)
        {
            let row = 0;
            this.grid[row][col].cellValue = 3;
        }
    }

    findCellsToMinimize() 
    {
        this.findMatchingCellsAcross();    
        this.findMatchingCellsUpDown();
    }

    findMatchingCellsUpDown() {
        for (let col = 0; col < this.columns; col++)
        {
            for (let row = 2; row < this.rows; row++) 
            {
                let cell1 = this.getCell(row - 2, col);
                let cell2 = this.getCell(row-1, col);
                let cell3 = this.getCell(row, col);
                if (cell1.cellValue > 0 &&
                    cell1.cellValue === cell2.cellValue &&
                    cell2.cellValue === cell3.cellValue) {
                    cell1.minimize = true;
                    cell2.minimize = true;
                    cell3.minimize = true;
                }
            }
        }
    }

    findMatchingCellsAcross() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 2; col < this.columns; col++) {
                let cell1 = this.getCell(row, col);
                let cell2 = this.getCell(row, col - 1);
                let cell3 = this.getCell(row, col - 2);
                if (cell1.cellValue > 0 &&
                    cell1.cellValue === cell2.cellValue &&
                    cell2.cellValue === cell3.cellValue) {
                    cell1.minimize = true;
                    cell2.minimize = true;
                    cell3.minimize = true;
                }
            }
        }
    }

    setupGameGrid(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;

        this.makeEmptyGrid();
    }

    setCellValue(row: number, column: number ,cellValue: number)
    {
        this.grid[row][column].cellValue = cellValue;
    }

    getCellValue(row: number, column: number): number
    {
        return this.grid[row][column].cellValue;
    }

    getCell(row: number, column: number): TriadGridCell
    {
        return this.grid[row][column];
    }    

    makeEmptyGrid() {
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