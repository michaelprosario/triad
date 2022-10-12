import { MessageTopics } from "../playtime.core/enums/message-topics";
import { MessageTypes } from "../playtime.core/enums/message-types";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameMessage } from "../playtime.core/value-objects/game-message";

export class InputController {
    private _keyUp: Phaser.Input.Keyboard.Key;
    private _keyDown: Phaser.Input.Keyboard.Key;
    private _keyLeft: Phaser.Input.Keyboard.Key;
    private _keyRight: Phaser.Input.Keyboard.Key;
    private _keySpace: Phaser.Input.Keyboard.Key;
    private _keyX: Phaser.Input.Keyboard.Key;
    messageService: GameMessageService;
    keyIsUp: boolean = true;
    keyIsDown: boolean = false;

    private _scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, messageService: GameMessageService) 
    {
        this._scene = scene;
        this.messageService = messageService;

        this._keyUp = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this._keyDown = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this._keyLeft = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this._keyRight = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this._keySpace = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this._keyX = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update(): void {
        
        this.keyIsUp = true;
        if (this._keyUp?.isDown){
            this.keyIsDown = true
            this.sendKeyMessage(MessageTypes.KeyDown, Phaser.Input.Keyboard.KeyCodes.UP);
        } 
            
        if (this._keyDown?.isDown){
            this.keyIsDown = true
            this.sendKeyMessage(MessageTypes.KeyDown, Phaser.Input.Keyboard.KeyCodes.DOWN);
        } 
            
        if (this._keyLeft?.isDown){
            this.keyIsDown = true
            this.sendKeyMessage(MessageTypes.KeyDown, Phaser.Input.Keyboard.KeyCodes.LEFT);
        } 
            
        if (this._keyRight?.isDown){
            this.keyIsDown = true
            this.sendKeyMessage(MessageTypes.KeyDown, Phaser.Input.Keyboard.KeyCodes.RIGHT);
        } 
            
        if (this._keyDown?.isDown){
            this.keyIsDown = true
            this.sendKeyMessage(MessageTypes.KeyDown, Phaser.Input.Keyboard.KeyCodes.DOWN);
        } 
            
        if (this._keySpace?.isDown){
            this.keyIsDown = true
            this.sendKeyMessage(MessageTypes.KeyDown, Phaser.Input.Keyboard.KeyCodes.SPACE);
        } 
            
        if (this._keyX?.isDown) {
            this.keyIsDown = true
            this.sendKeyMessage(MessageTypes.KeyDown, Phaser.Input.Keyboard.KeyCodes.X);
        }

        if(this.keyIsUp && this.keyIsDown)
        {
            this.sendKeyMessage(MessageTypes.KeyUp, 0);
            this.keyIsDown = false;
        }
            
    }

    private sendKeyMessage(messageType: number, keyCode: number) {
        if(messageType === MessageTypes.KeyDown)
        {
            this.keyIsUp = false;
        }

        let gameMessage = new GameMessage();
        gameMessage.messageType = messageType;
        gameMessage.content = keyCode;
        gameMessage.source = "InputController";
        gameMessage.topic = MessageTopics.UserInput;
        gameMessage.timeStamp = new Date().getTime();
        this.messageService.publish(gameMessage);
    }
}