import { GameMessage } from "../value-objects/game-message";
import { Point2d } from "../value-objects/point-2d";

export abstract class GameNode
{
  abstract receiveMessage(message: GameMessage): any;
  abstract start(): any;
  abstract update(time: number, delta: number): any;
  children: Array<GameNode> = [];
  id: string = "";
  isActive: boolean = true;
  parent: GameNode | undefined = undefined;
  position: Point2d = new Point2d();
  startTime: number = 0;
}
