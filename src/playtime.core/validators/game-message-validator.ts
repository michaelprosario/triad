import { AbstractValidator } from "fluent-ts-validator";
import { GameMessage } from "../value-objects/game-message";

export class GameMessageValidator extends AbstractValidator<GameMessage> {
    constructor() {
        super();
        this.validateIfNumber(r => r.timeStamp).isGreaterThan(0);
        this.validateIfNumber(r => r.messageType).isGreaterThan(0);
        this.validateIfNumber(r => r.topic).isGreaterThan(0);
        this.validateIfString(r => r.source).isNotEmpty();
    }
}