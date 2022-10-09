export class GameMessage
{
    constructor()
    {
        this.timeStamp = new Date().getTime()
    }
    
    timeStamp: number = 0;
    messageType: number = 0;
    content: any = {};
    source: string = "";
    topic: number = 0;
}