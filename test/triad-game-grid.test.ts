import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { TriadGameGrid } from "../src/triad.core/entity/triad-game-grid"

@suite class TriadGameGridTests {

  GRID_ROWS: number = 36;
  GRID_COLS: number = 12;

  before() {

  }

  @test 'Setup should create set size correctly'() 
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

  @test 'Find cells for minimization - across'() 
  {
    // arrange
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(this.GRID_ROWS,this.GRID_COLS);
    
    const currentRow = 34;
    for(let i=0; i<12; i++){
      gameGrid.setCellValue(currentRow, i, 1);
    }

    gameGrid.setCellValue(currentRow, 5, 2);
    gameGrid.setCellValue(currentRow, 6, 2);
    gameGrid.setCellValue(currentRow, 7, 2);

    // act
    gameGrid.findCellsToMinimize();

    // assert
    _chai.assert(gameGrid.getCell(currentRow, 5).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 6).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 7).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 1).minimize === false, "we should minimize here");
  }

}