import { MathHelper } from "../../playtime.core/helpers/math-helper";
import { TriadGameGrid } from "../entity/triad-game-grid";

export class TriadModel
{   
    data: Array<number> = [1,1,1];
    originalData: Array<number> = [1,1,1];
    permutationIndex: number = 0;
    permutations: Array<Array<number>>;
    row: number = 0;
    column: number = 0;

    constructor(private grid: TriadGameGrid)
    {
        this.permutations = [
            [0,1,2],
            [0,2,1],
            [1,0,2],
            [1,2,0],
            [2,0,1],
            [2,1,0],
        ];
    }

    setUp(blockSpecification: Array<number>){
        if(!blockSpecification)
        {
            throw new Error("blockSpecification is not defined");
        }

        this.data = [...blockSpecification];
        this.originalData = [...blockSpecification];
    }

    setUpRandom(maxBlockNumber: number) {
        let specArray: Array<number> = [];
        for(let i=0; i<3; i++)
        {
            let blockNumber = MathHelper.randomIntFromInterval(1,maxBlockNumber);
            specArray.push(blockNumber);
        }

        this.setUp(specArray);
    }

    permutate()
    {
        this.permutationIndex++;
        if(this.permutationIndex > 5)
        {
            this.permutationIndex = 0;
        }

        const orderConfig = this.permutations[this.permutationIndex];
        const newData = [this.originalData[orderConfig[0]], this.originalData[orderConfig[1]],this.originalData[orderConfig[2]]];
        this.data = newData;
    }

    canMoveLeft() 
    {
        if(this.column === 0){
            return false;
        }

        let response: boolean = true;

        response = this.checkIfCellEmpty(this.row, this.column - 1, response);
        response = this.checkIfCellEmpty(this.row+1, this.column - 1, response);
        response = this.checkIfCellEmpty(this.row+2, this.column - 1, response);

        return response;
    }

    private checkIfCellEmpty(row: number, col: number, response: boolean) {
        if(row>this.grid.rows-1)
        {
            return false;
        }

        if(col > this.grid.columns-1){
            return false;
        }

        let cell = this.grid.getCell(row, col);
        if (!cell) {
            response = false;
        } else {
            if (cell.cellValue > 0) {
                response = false;
            }
        }
        return response;
    }

    canMoveRight() {
        if(this.column === this.grid.columns - 1){
            return false;
        }

        let response: boolean = true;
        response = this.checkIfCellEmpty(this.row, this.column + 1, response);
        response = this.checkIfCellEmpty(this.row+1, this.column + 1, response);
        response = this.checkIfCellEmpty(this.row+2, this.column + 1, response);
        return response;
    }    

    canMoveDown() {
        if(this.row >= this.grid.rows - 1){
            return false;
        }

        let response = true;
        return this.checkIfCellEmpty(this.row+3, this.column, response);
    }    
}