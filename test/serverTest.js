var assert = require('chai').assert;
const server = require('../server');

describe('Sever', function() {
    describe('sayTestAreWorking()', function(){

        it('sayTestsAreWorking should return Tests are working', function() {
            assert.equal(server.sayTestsAreWorking(), 'Tests are working');
        });
    
        it('sayTestsAreWorking should return type string', function(){
            assert.typeOf(server.sayTestsAreWorking(), 'string');
        });
    })
	
    describe('addNumbers()', function(){
        it('addNumbers should be above 5', function(){
            assert.isAbove(server.addNumbers(4,5), 5)
        });
    
        it('addNumbers should return type number', function(){
            assert.typeOf(server.addNumbers(1,5), 'number')
        });
    })
});
