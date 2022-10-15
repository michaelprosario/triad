import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { TriadGameGrid } from "../src/triad.core/entity/triad-game-grid"

/*


- CanMoveRight
    - Nothing is there
    - Blocked on right
    - Blocked by side of game area

- CanMoveDown
    - Nothing is there
    - Blocked on bottom by block
    - Blocked by bottom of game area
*/
/*
Given
- Triad is not blocked on left
When 
- CanMoveLeft() is executed
Then
- Method returns true
===
Given
- Triad is blocked by block on left
When 
- CanMoveLeft() is executed
Then
- Method returns false
===
Given
- Triad is blocked by block by size of the screen
When 
- CanMoveLeft() is executed
Then
- Method returns false
===



Given
- Triad is not blocked on right
When 
- CanMoveRight() is executed
Then
- Method returns true
===
Given
- Triad is blocked by block on right
When 
- CanMoveRight() is executed
Then
- Method returns false
===
Given
- Triad is blocked by block by size of the screen
When 
- CanMoveRight() is executed
Then
- Method returns false
===

Given
- Triad is not blocked on Bottom
When 
- CanMoveBottom() is executed
Then
- Method returns true
===
Given
- Triad is blocked by block on Bottom
When 
- CanMoveBottom() is executed
Then
- Method returns false
===
Given
- Triad is blocked by block by size of the screen
When 
- CanMoveBottom() is executed
Then
- Method returns false
===

*/

@suite class TriadGameGridTests {

  GRID_ROWS: number = 36;
  GRID_COLS: number = 12;

  before() {

  }

  @test 'TriadModel'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();

    // act
    gameGrid.setupGameGrid(this.GRID_ROWS,this.GRID_COLS);

    // assert
    _chai.assert(gameGrid.rows === 36, "rows is correct");
    _chai.assert(gameGrid.columns === 12, "cols is correct");
    _chai.assert(gameGrid.grid.length === 36, "grid rows is set correctly");

  }


}