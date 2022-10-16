import { GameNode } from '../src/playtime.core/entities/game-node'
import { GameMessage } from '../src/playtime.core/value-objects/game-message';

export class Thing extends GameNode
{
    receiveMessage(message: GameMessage) {
        throw new Error('Method not implemented.');
    }
    start() {
        throw new Error('Method not implemented.');
    }
    
    update(time: number, delta: number) {
        throw new Error('Method not implemented.');
    }

}