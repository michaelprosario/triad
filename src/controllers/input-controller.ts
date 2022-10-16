import { MessageTopics } from "../playtime.core/enums/message-topics";
import { MessageTypes } from "../playtime.core/enums/message-types";
import { GameMessageService } from "../playtime.core/services/game-message-service";
import { GameMessage } from "../playtime.core/value-objects/game-message";

let intputController: InputController;
export class InputController {

    messageService: GameMessageService;
    keyIsUp: boolean = true;
    keyIsDown: boolean = false;

    private _scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, messageService: GameMessageService) 
    {
        this._scene = scene;
        this.messageService = messageService;
        scene.input.keyboard.on('keydown', this.handleKeyDown, scene);
        scene.input.keyboard.on('keyup', this.handleKeyUp, scene);
        intputController = this;
    }

    handleKeyDown(eventArgs:any){
        console.log("key down ");
        console.log(eventArgs);
        intputController.sendKeyMessage(MessageTypes.KeyDown, eventArgs.keyCode);
    }

    handleKeyUp(eventArgs:any){
        console.log("key up " + eventArgs);        
        intputController.sendKeyMessage(MessageTypes.KeyUp, 0);
    }    

    update(time: number, delta: number): void 
    {      
            
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