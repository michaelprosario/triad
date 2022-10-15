import { GameNode } from "../playtime.core/entities/game-node";
import { GameMessage } from "../playtime.core/value-objects/game-message";
import { TriadGameGrid } from "../triad.core/entity/triad-game-grid";
import { TriadConstants } from "../triad.core/triad-constants";

export class GridNode extends GameNode
{

    triadGrid: TriadGameGrid;
    sprites: Array<Phaser.GameObjects.Sprite>;

    constructor(
        private scene: Phaser.Scene        
    )
    {
        super();
        this.triadGrid = new TriadGameGrid();
        this.sprites = [];
    }

    start()
    {
        this.triadGrid.setupGameGrid(36,12);    
    }

    placeRandomBlocks(){
        this.triadGrid.placeRandomBlocks(100);
    }
        
    refreshGrid() 
    {
        for(let col=0; col<this.triadGrid.columns; col++)
        {
            for(let row=0; row<this.triadGrid.rows; row++)
            {
                let blockNumber = this.triadGrid.getCellValue(row,col);
                if(blockNumber > 0)
                {
                    let blockName = "box" + blockNumber;
                    let sprite = this.scene.add.sprite(col* TriadConstants.BLOCK_WIDTH,row*TriadConstants.BLOCK_WIDTH, blockName);
                    this.sprites.push(sprite);  
                }
            }
        }
    }

    update() 
    {       

    }

    receiveMessage(message: GameMessage) 
    {

    }
}