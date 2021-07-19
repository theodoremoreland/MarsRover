const assert = require('assert');
const Command = require('../classes/command');

describe("Command class", () => {
  it("should throw error if type is NOT passed into constructor as first parameter", () => {
      
    assert.throws(() => new Command(), { message: 'Type required' });
  });
});