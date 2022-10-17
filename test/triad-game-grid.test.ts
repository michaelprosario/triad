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
    let gameGrid = this.makeGameGrid();
    
    const currentRow = 35;

    gameGrid.setCellValue(currentRow, 5, 2);
    gameGrid.setCellValue(currentRow, 6, 2);
    gameGrid.setCellValue(currentRow, 7, 2);

    // act
    gameGrid.findCellsToMinimize();

    // assert
    _chai.assert(gameGrid.getCell(currentRow, 5).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 6).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 7).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 1).minimize === false, "we should not minimize here");
  }

  private makeGameGrid() {
    let gameGrid = new TriadGameGrid();
    gameGrid.setupGameGrid(this.GRID_ROWS, this.GRID_COLS);
    return gameGrid;
  }

  @test 'Find cells for minimization- across - find cells at end'() 
  {
    // arrange
    let gameGrid = this.makeGameGrid();
    
    const currentRow = 35;

    gameGrid.setCellValue(currentRow, 11, 2);
    gameGrid.setCellValue(currentRow, 10, 2);
    gameGrid.setCellValue(currentRow, 9, 2);

    // act
    gameGrid.findCellsToMinimize();

    // assert
    _chai.assert(gameGrid.getCell(currentRow, 11).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 10).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 9).minimize === true, "we should minimize here");
  }

  @test 'Find cells for minimization - across - find cells at front'() 
  {
    // arrange
    let gameGrid = this.makeGameGrid();
    
    const currentRow = 35;

    gameGrid.setCellValue(currentRow, 0, 2);
    gameGrid.setCellValue(currentRow, 1, 2);
    gameGrid.setCellValue(currentRow, 2, 2);
    gameGrid.setCellValue(currentRow, 3, 2);
    gameGrid.setCellValue(currentRow, 7, 2);


    // act
    gameGrid.findCellsToMinimize();

    // assert
    _chai.assert(gameGrid.getCell(currentRow, 0).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 1).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow, 2).minimize === true, "we should minimize here");
  }

  @test 'Find cells for minimization - up and down - case1'() 
  {
    // arrange
    let gameGrid = this.makeGameGrid();
    
    const currentCol = 0;
    const currentRow = this.GRID_ROWS - 3;

    gameGrid.setCellValue(currentRow, currentCol, 2);
    gameGrid.setCellValue(currentRow+1, currentCol, 2);
    gameGrid.setCellValue(currentRow+2, currentCol, 2);


    // act
    gameGrid.findCellsToMinimize();

    // assert
    _chai.assert(gameGrid.getCell(currentRow, currentCol).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow+1, currentCol).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow+2, currentCol).minimize === true, "we should minimize here");
  }

  @test 'Find cells for minimization - up and down - case2'() 
  {
    // arrange
    let gameGrid = this.makeGameGrid();
    
    const currentCol = 11;
    const currentRow = this.GRID_ROWS - 10;

    gameGrid.setCellValue(currentRow, currentCol, 2);
    gameGrid.setCellValue(currentRow+1, currentCol, 2);
    gameGrid.setCellValue(currentRow+2, currentCol, 2);

    // act
    gameGrid.findCellsToMinimize();

    // assert
    _chai.assert(gameGrid.getCell(currentRow, currentCol).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow+1, currentCol).minimize === true, "we should minimize here");
    _chai.assert(gameGrid.getCell(currentRow+2, currentCol).minimize === true, "we should minimize here");
  }

  @test 'Reducing a grid'() 
  {
    // arrange
    let gameGrid = this.makeGameGrid();
    
    let currentCol = 1;
    let currentRow = 26

    gameGrid.setCellValue(currentRow,   currentCol, 3);
    gameGrid.setCellValue(currentRow+1, currentCol, 4);
    gameGrid.setCellValue(currentRow+2, currentCol, 2);
    gameGrid.setCellValue(currentRow+3, currentCol, 2);
    gameGrid.setCellValue(currentRow+4, currentCol, 2);
    gameGrid.setCellValue(currentRow+5, currentCol, 5);
    gameGrid.setCellValue(currentRow+6, currentCol, 1);
    gameGrid.setCellValue(currentRow+7, currentCol, 2);
    gameGrid.setCellValue(currentRow+8, currentCol, 2);
    gameGrid.setCellValue(currentRow+9, currentCol, 2);    

    // act
    gameGrid.findCellsToMinimize();
    let newGrid = gameGrid.makeReducedGrid();

    console.log(newGrid);
    
    // assert    
    _chai.assert(newGrid[32][1].cellValue === 3);
    _chai.assert(newGrid[33][1].cellValue === 4);
    _chai.assert(newGrid[34][1].cellValue === 5);
    _chai.assert(newGrid[35][1].cellValue === 1);
  }  


}