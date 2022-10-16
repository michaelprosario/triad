import Phaser from 'phaser';
import { InputController } from '../controllers/input-controller';
import { GridNode } from '../nodes/grid-node';
import { TriadNode } from '../nodes/triad-node';
import { GameMessageService } from '../playtime.core/services/game-message-service';

export default class Demo extends Phaser.Scene {

  gridNode: GridNode | undefined;  
  triadNode: TriadNode | undefined;

  gameMessageService: GameMessageService | undefined;
  inputController: InputController | undefined;

  constructor() {
    super('GameScene');
  }

  preload() {    
    this.load.image('box1', '../assets/images/block1.png');
    this.load.image('box2', '../assets/images/block2.png');
    this.load.image('box3', '../assets/images/block3.png');
    this.load.image('box4', '../assets/images/block4.png');
    this.load.image('box5', '../assets/images/block5.png');    
  }

  create() {
    this.gameMessageService = new GameMessageService();
    this.inputController = new InputController(this, this.gameMessageService);

    this.gridNode = new GridNode(this);
    this.gridNode.start();
    this.gridNode.placeRandomBlocks();
    this.gridNode.refreshGrid();


    this.triadNode = new TriadNode(this, this.gameMessageService, this.gridNode.triadGrid);    
    this.triadNode.start();

  }

  update(time: number, delta: number): void {
    this.inputController?.update();
    this.gameMessageService?.update();
    this.triadNode?.update();    
  }
}
