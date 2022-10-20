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

    // timers
    dropTimer: number = 0;
    moveDownTimer: number = 0;
    permuteTimer: number = 0;

    // sprites
    bottomSprite: Phaser.GameObjects.Sprite;    
    middleSprite: Phaser.GameObjects.Sprite;
    topSprite: Phaser.GameObjects.Sprite;

    
    increment: number = TriadConstants.BLOCK_WIDTH;       
    
    // counters 
    noDownCount = 0;
    
    // data 
    triadModel: TriadModel;
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
        this.updateSpriteDisplay();
        this.handleMovement();
        this.handlePermute();

        if(this.dropTimer > 2000)
        {
            if(!this.triadModel.canMoveDown()){
                this.noDownCount++;
            }

            if(this.noDownCount > 1)
            {                                                
                this.handleTriadReboot();                       
                this.noDownCount = 0;
            }

            this.moveTriadDown();
            this.dropTimer = 0;
        }

        this.moveDownTimer += delta;
        this.permuteTimer += delta;
        this.dropTimer += delta;
    }

    private handleTriadReboot() {
        let row = this.triadModel.row;
        let col = this.triadModel.column;

        // mark grid with triad
        // mark top brick
        this.grid.setCellValue(row, col, this.triadModel.data[0]);
        // mark middle brick
        this.grid.setCellValue(row + 1, col, this.triadModel.data[1]);
        // mark bottom brick
        this.grid.setCellValue(row + 2, col, this.triadModel.data[2]);

        let message = new GameMessage();
        message.content = "";
        message.messageType = MessageTypes.FindThreeInRow;
        message.source = "TriadNode";
        message.topic = MessageTopics.GridState;
        this.messageService.publish(message);

        // reset triad
        this.triadModel.setUpRandom(5);
        this.updateTriadTextures();
        this.topSprite.x = 0;
        this.topSprite.y = 0;
        this.triadState = TriadState.IDLE;
    }

    private handleMovement() {
        if (this.moveDownTimer > 80) {

            switch (this.triadState) {
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
            }

            this.moveDownTimer = 0;
        }
    }

    private handlePermute() {
        if (this.permuteTimer > 200) {

            if (this.triadState === TriadState.PERMUTE)
                this.permuteTriad();

            this.permuteTimer = 0;
        }
    }

    private updateSpriteDisplay() {
        this.bottomSprite.x = this.topSprite.x;
        this.bottomSprite.y = this.topSprite.y + (TriadConstants.BLOCK_WIDTH * 2);

        this.middleSprite.x = this.topSprite.x;
        this.middleSprite.y = this.topSprite.y + TriadConstants.BLOCK_WIDTH;

        this.triadModel.row = Math.floor(this.topSprite.y / TriadConstants.BLOCK_WIDTH);
        this.triadModel.column = Math.floor(this.topSprite.x / TriadConstants.BLOCK_WIDTH);
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