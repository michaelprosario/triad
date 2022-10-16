import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { TriadGameGrid } from "../src/triad.core/entity/triad-game-grid"
import { TriadModel } from '../src/triad.core/value-objects/triad-model';

@suite class TriadGameGridTests {

  GRID_ROWS: number = 36;
  GRID_COLS: number = 12;

  before() {

  }

  @test 'Triad is not blocked on left, CanMoveLeft() returns true'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

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

  @test 'Triad is not blocked on left end of grid, CanMoveLeft() returns false'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model 5 from the left
    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 0;
    triadModel.setUpRandom(5);

    // act
    let response = triadModel.canMoveLeft();

    // assert
    _chai.assert(response === false, "rows is correct");
  }

  @test 'Triad is not blocked on left by block, CanMoveLeft() returns false'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model 5 from the left
    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 5;
    triadModel.setUpRandom(5);

    gameGrid.setCellValue(0, 4, 1);

    // act
    let response = triadModel.canMoveLeft();

    // assert
    _chai.assert(response==false, "rows is correct");
  }

  @test 'Triad is not blocked on right, CanMoveRight() returns true'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model 5 from the left
    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 5;
    triadModel.setUpRandom(5);

    // act
    let response = triadModel.canMoveRight();

    // assert
    _chai.assert(response, "rows is correct");
  }

  @test 'Triad is blocked on right, CanMoveRight() returns false'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model 5 from the left
    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 5;
    triadModel.setUpRandom(5);

    gameGrid.setCellValue(0,6,1); // add blocking block

    // act
    let response = triadModel.canMoveRight();

    // assert
    _chai.assert(response === false, "rows is correct");
  }
  
  @test 'Triad is blocked on right side of grid, CanMoveRight() returns false'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 19;
    triadModel.setUpRandom(5);

    // act
    let response = triadModel.canMoveRight();

    // assert
    _chai.assert(response === false, "rows is correct");
  }

  @test 'Triad is not blocked on bottom, CanMoveDown() returns true'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 5;
    triadModel.setUpRandom(5);

    // act
    let response = triadModel.canMoveDown();

    // assert
    _chai.assert(response === true, "rows is correct");
  }

  @test 'Triad is blocked on bottom, CanMoveDown() returns true'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 0;
    triadModel.column = 5;
    triadModel.setUpRandom(5);

    gameGrid.setCellValue(3,5,1);

    // act
    let response = triadModel.canMoveDown();

    // assert
    _chai.assert(response === false, "rows is correct");
  }

  @test 'Triad is blocked on bottom of grid, CanMoveDown() returns true'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(10,20);

    // put triad model at top
    let triadModel = new TriadModel(gameGrid);
    triadModel.row = 7;
    triadModel.column = 5;
    triadModel.setUpRandom(5);

    // act
    let response = triadModel.canMoveDown();

    // assert
    _chai.assert(response === false, "rows is correct");
  }


}