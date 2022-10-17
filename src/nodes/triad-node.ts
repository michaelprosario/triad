import { GameNode } from "../playtime.core/entities/game-node";
import { MessageTopics } from "../playtime.core/enums/message-topics";
import { MessageTypes } from "../playtime.core/enums/message-types";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameMessage } from "../playtime.core/value-objects/game-message";
import { TriadGameGrid } from "../triad.core/entity/triad-game-grid";
import { TriadConstants } from "../triad.core/triad-constants";
import { TriadModel } from "../triad.core/value-objects/triad-model";

export enum TriadState{
    IDLE,
    MOVING_LEFT,
    MOVING_RIGHT,
    MOVING_DOWN,
    PERMUTE
}

export class TriadNode extends GameNode
{

    bottomSprite: Phaser.GameObjects.Sprite;
    middleSprite: Phaser.GameObjects.Sprite;
    topSprite: Phaser.GameObjects.Sprite;
    triadModel: TriadModel;
    increment: number = TriadConstants.BLOCK_WIDTH;   
    triadState: TriadState = TriadState.IDLE;

    constructor(
        private scene: Phaser.Scene, 
        private messageService: GameMessageService,
        private grid: TriadGameGrid
        )
    {
        super();

        // construction 
        let startX = 0;
        let startY = 0;
        
        this.topSprite = this.scene.add.sprite(startX, startY, 'box1');
        this.middleSprite = this.scene.add.sprite(startX, startY+TriadConstants.BLOCK_WIDTH, 'box2');
        this.bottomSprite = this.scene.add.sprite(startX, startY+(TriadConstants.BLOCK_WIDTH*2), 'box3');
        this.topSprite.x = startX;
        this.topSprite.y = startY;

        this.triadModel = new TriadModel(this.grid);
        this.triadModel.setUpRandom(5);
        
        this.messageService.subscribe(this, MessageTopics.UserInput);
    }
        
    start() 
    {
        // start
        this.updateTriadTextures();
    }

    private updateTriadTextures() {
        this.topSprite.setTexture('box' + this.triadModel.data[0]);
        this.middleSprite.setTexture('box' + this.triadModel.data[1]);
        this.bottomSprite.setTexture('box' + this.triadModel.data[2]);
    }

    update(time: number, delta: number) 
    {  
        // update the display     
        this.bottomSprite.x = this.topSprite.x;
        this.bottomSprite.y = this.topSprite.y+(TriadConstants.BLOCK_WIDTH*2);
        
        this.middleSprite.x = this.topSprite.x;
        this.middleSprite.y = this.topSprite.y+TriadConstants.BLOCK_WIDTH;    
        
        this.triadModel.row = Math.floor(this.topSprite.y / TriadConstants.BLOCK_WIDTH);
        this.triadModel.column = Math.floor(this.topSprite.x / TriadConstants.BLOCK_WIDTH);

        switch(this.triadState){
            case TriadState.IDLE:
                break;
            case TriadState.MOVING_DOWN:
                this.moveTriadDown();
                break;
            case TriadState.MOVING_LEFT:
                this.moveTriadLeft();
                break;
            case TriadState.MOVING_RIGHT:
                this.moveTriadRight();
                break;
            case TriadState.PERMUTE:
                    this.permuteTriad();
                    break;                
        }
    }

    receiveMessage(message: GameMessage) 
    {
        if(message.messageType == MessageTypes.KeyDown)
        {
            if (message.content === Phaser.Input.Keyboard.KeyCodes.DOWN) {
                this.triadState = TriadState.MOVING_DOWN;
            }
            else if (message.content === Phaser.Input.Keyboard.KeyCodes.LEFT) {
                this.triadState = TriadState.MOVING_LEFT;
            }
            else if (message.content === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
                this.triadState = TriadState.MOVING_RIGHT;
            }        
            else if (message.content === Phaser.Input.Keyboard.KeyCodes.SPACE) {
                this.triadState = TriadState.PERMUTE;
            }                            
        }
        else if(message.messageType == MessageTypes.KeyUp)
        {
            this.triadState = TriadState.IDLE;
        }
    }

    private permuteTriad() {
        this.triadModel.permutate();
        this.updateTriadTextures();
    }

    private moveTriadRight() {
        if(this.triadModel.canMoveRight())
            this.topSprite.x += TriadConstants.BLOCK_WIDTH;
    }

    private moveTriadLeft() {
        if(this.triadModel.canMoveLeft())
            this.topSprite.x -= TriadConstants.BLOCK_WIDTH;
    }

    private moveTriadDown() {
        if(this.triadModel.canMoveDown())
            this.topSprite.y += TriadConstants.BLOCK_WIDTH;
    }
}