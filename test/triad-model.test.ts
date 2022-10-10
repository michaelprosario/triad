import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { TriadModel } from '../src/triad.core/value-objects/triad-model';

@suite class TriadModelTests {

  before() {

  }

  @test 'Setup should configure triad'() 
  {
    // arrange
    let triadModel = new TriadModel();
    let blockSpecification: Array<number> = [1,2,3];

    // act
    triadModel.setUp(blockSpecification);

    // assert
    _chai.assert(triadModel.data !== null, "data is defined");
    _chai.assert(triadModel.data.length === 3, "size is correct");    
  }

  @test 'SetupRandom should configure triad with random data'() 
  {
    // arrange
    let triadModel = new TriadModel();    

    // act
    triadModel.setUpRandom(5);
    
    // assert
    _chai.assert(triadModel.data !== null, "data is defined");
    _chai.assert(triadModel.data.length === 3, "size is correct");    
  }  

  @test 'Permuate should work'() 
  {
    // arrange
    let triadModel = new TriadModel();    
    triadModel.setUp([1,2,3]);

    // act
    triadModel.permutate();
        
    // assert
    _chai.assert(triadModel.data[0] === 1);
    _chai.assert(triadModel.data[1] === 3);
    _chai.assert(triadModel.data[2] === 2);    

    // act
    triadModel.permutate();
        
    // assert
    _chai.assert(triadModel.data[0] === 2);
    _chai.assert(triadModel.data[1] === 1);
    _chai.assert(triadModel.data[2] === 3);  
    
    // act
    triadModel.permutate();
        
    // assert
    _chai.assert(triadModel.data[0] === 2);
    _chai.assert(triadModel.data[1] === 3);
    _chai.assert(triadModel.data[2] === 1);   
    
    // act
    triadModel.permutate();
        
    // assert
    _chai.assert(triadModel.data[0] === 3);
    _chai.assert(triadModel.data[1] === 1);
    _chai.assert(triadModel.data[2] === 2);      

    // act
    triadModel.permutate();
        
    // assert
    _chai.assert(triadModel.data[0] === 3);
    _chai.assert(triadModel.data[1] === 2);
    _chai.assert(triadModel.data[2] === 1);        
    
    // act
    triadModel.permutate();
        
    // assert
    _chai.assert(triadModel.data[0] === 1);
    _chai.assert(triadModel.data[1] === 2);
    _chai.assert(triadModel.data[2] === 3);      
  }   
}