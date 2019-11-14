const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {
  
  it("throws error if type is NOT passed into constructor as first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Type required'
      }
    );
  });

});