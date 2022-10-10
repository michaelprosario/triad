export class MathHelper
{
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    static randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }      
}