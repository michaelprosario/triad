import { GameNode } from "../playtime.core/entities/game-node";
import { MessageTopics } from "../playtime.core/enums/message-topics";
import { MessageTypes } from "../playtime.core/enums/message-types";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameMessage } from "../playtime.core/value-objects/game-message";
import { TriadModel } from "../triad.core/value-objects/triad-model";

export class TriadNode extends GameNode
{

    bottomSprite: Phaser.GameObjects.Sprite;
    middleSprite: Phaser.GameObjects.Sprite;
    topSprite: Phaser.GameObjects.Sprite;
    triadModel: TriadModel;

    BLOCK_WIDTH: number = 40;
    increment: number = this.BLOCK_WIDTH;   
    stopMoving: boolean = false; 

    constructor(
        private scene: Phaser.Scene, 
        private messageService: GameMessageService
        )
    {
        super();

        let startX = 500 * Math.random();
        let startY = 500 * Math.random();
        
        this.topSprite = scene.add.sprite(startX, startY, 'box1');
        this.middleSprite = scene.add.sprite(startX, startY+this.BLOCK_WIDTH, 'box2');
        this.bottomSprite = scene.add.sprite(startX, startY+(this.BLOCK_WIDTH*2), 'box3');
        this.topSprite.x = startX;
        this.topSprite.y = startY;

        this.triadModel = new TriadModel();
        this.triadModel.setUpRandom(5);
        
        this.messageService.subscribe(this, MessageTopics.UserInput);
    }
        
    start() 
    {
        this.updateTriadTextures();
    }

    private updateTriadTextures() {
        this.topSprite.setTexture('box' + this.triadModel.data[0]);
        this.middleSprite.setTexture('box' + this.triadModel.data[1]);
        this.bottomSprite.setTexture('box' + this.triadModel.data[2]);
    }

    update() 
    {       
        this.bottomSprite.x = this.topSprite.x;
        this.bottomSprite.y = this.topSprite.y+(this.BLOCK_WIDTH*2);
        
        this.middleSprite.x = this.topSprite.x;
        this.middleSprite.y = this.topSprite.y+this.BLOCK_WIDTH;                
    }

    receiveMessage(message: GameMessage) 
    {
        if(message.messageType == MessageTypes.KeyDown)
        {
            if(!this.stopMoving)
            {
                this.onKeyDown(message);   
                this.stopMoving = true;
            }
        }
        else if(message.messageType == MessageTypes.KeyUp)
        {
            this.stopMoving = false; 
        }
    }

    private onKeyDown(message: GameMessage) {
        
        if (message.content === Phaser.Input.Keyboard.KeyCodes.UP) {
            this.topSprite.y -= this.BLOCK_WIDTH;
        }
        else if (message.content === Phaser.Input.Keyboard.KeyCodes.DOWN) {
            this.topSprite.y += this.BLOCK_WIDTH;
        }
        else if (message.content === Phaser.Input.Keyboard.KeyCodes.LEFT) {
            this.topSprite.x -= this.BLOCK_WIDTH;
        }
        else if (message.content === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
            this.topSprite.x += this.BLOCK_WIDTH;
        }        
        else if (message.content === Phaser.Input.Keyboard.KeyCodes.SPACE) {
            this.triadModel.permutate();
            this.updateTriadTextures();
        }
    }
}