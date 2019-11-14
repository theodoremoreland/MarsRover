const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {

  it("throws error if name NOT passed into constructor", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required'
      }
    );
  });

    it("constructor sets name", function() {
      const message = new Message("Alex");
      assert.strictEqual(message.name, "Alex");
  });

    it("contains commands passed into constructor as 2nd argument", function() {
      const commands = [new Command('MODE_CHANGE', 'LOW_POWER'),
                      new Command('STATUS_CHECK')];
      const message = new Message("Alex", commands);
      assert.strictEqual(message.commands, commands);
  });

  class Dog {
	constructor(color) {
	this.color = color
	}
}

// Should set color to brown if first argument is “brown”.

let actualDogColor = new Dog("brown").color;
let expectedDogColor = "brown";

if (actualDogColor !== expectedDogColor) { 
console.log(`error for unit ‘Dog’. Expected: ${expectedDogColor}, but actually got: ${actualDogColor}.`);
	}
else { console.log(`'Should set color to brown if first argument is "brown"' test passed!`); 
        }



});

