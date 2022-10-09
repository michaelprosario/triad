import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { AdderService } from "../src/playtime.core/services/adder-service"

@suite class AdderUnitTests {

  before() {

  }

  @test 'Numbers should add correctly'() 
  {
    // arrange
    let a:number = 5;
    let b:number = 3; 

    let service = new AdderService();
    
    // act
    let response = service.addStuff(a,b);

    // assert
    _chai.assert(response === 8, "sum is correct");
  }
}