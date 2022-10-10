import { MathHelper } from "../../playtime.core/helpers/math-helper";

export class TriadModel
{
    data: Array<number> = [1,1,1];
    originalData: Array<number> = [1,1,1];
    permutationIndex: number = 0;
    permutations: Array<Array<number>>;

    constructor()
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
          
}