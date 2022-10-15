import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { TriadGameGrid } from "../src/triad.core/entity/triad-game-grid"
import { TriadModel } from '../src/triad.core/value-objects/triad-model';


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
  /*
  Given
  - Triad is not blocked on left
  When 
  - CanMoveLeft() is executed
  Then
  - Method returns true
  */
  @test 'Triad is not blocked on left, CanMoveLeft() returns true'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.makeEmptyGrid();

    // put triad model 5 from the left
    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 5;
    triadModel.setUpRandom(5);

    // act
    let response = triadModel.canMoveLeft();

    // assert
    _chai.assert(response, "rows is correct");
  }


}