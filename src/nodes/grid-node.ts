import { GameMessage } from "../playtime.core/value-objects/game-message";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameNode } from "../playtime.core/entities/game-node";
import { MessageTopics } from "../playtime.core/enums/message-topics";
import { MessageTypes } from "../playtime.core/enums/message-types";
import { TriadConstants } from "../triad.core/triad-constants";
import { TriadGameGrid } from "../triad.core/entity/triad-game-grid";

export class GridNode extends GameNode
{

    triadGrid: TriadGameGrid;
    sprites: Array<Phaser.GameObjects.Sprite>;
    showBlocksToMinimize: boolean = false;

    constructor(
        private scene: Phaser.Scene,
        private messageSystem: GameMessageService
    )
    {
        super();
        this.triadGrid = new TriadGameGrid();
        this.sprites = [];
        
        messageSystem.subscribe(this, MessageTopics.GridState);
    }

    start()
    {
        this.triadGrid.setupGameGrid(15,20);    
    }

    placeRandomBlocks(){
        this.triadGrid.placeRandomBlocks(50);
    }
        
    refreshGrid() 
    {
        for(let col=0; col<this.triadGrid.columns; col++)
        {
            for(let row=0; row<this.triadGrid.rows; row++)
            {
                let block = this.triadGrid.getCell(row,col);
                let blockNumber = block.cellValue;
                if(blockNumber > 0)
                {
                    
                    let blockName = "box" + blockNumber;
                    if(block.minimize)
                    {
                        blockName = "block-minimize";    
                    }

                    let sprite = this.scene.add.sprite(col* TriadConstants.BLOCK_WIDTH,row*TriadConstants.BLOCK_WIDTH, blockName);
                    this.sprites.push(sprite);      

                }
            }
        }
    }

    update(time: number, delta: number) 
    {       

    }

    receiveMessage(message: GameMessage) 
    {
        if(message.messageType = MessageTypes.FindThreeInRow)
        {
            this.handleFindThreeInRow();            
        }        
    }

    private redrawGrid() {
        for (let sprite of this.sprites) {
            sprite.destroy();
        }

        this.sprites = [];
        this.refreshGrid();
    }

    private handleFindThreeInRow() {
        let cellsToMinimize = this.triadGrid.findCellsToMinimize();
        if (cellsToMinimize) {
            this.showBlocksToMinimize = true;
            this.redrawGrid();            
            setTimeout(() => this.minimizeGridAndRefresh(), 60);
        }else{
            this.redrawGrid();            
        }
    }

    minimizeGridAndRefresh()
    {
        this.triadGrid.minimizeGrid();
        this.redrawGrid();
        this.showBlocksToMinimize = false;
        this.handleFindThreeInRow();
    }

}