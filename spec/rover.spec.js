const assert = require('assert');
const Rover = require('../classes/rover.js');
const Message = require('../classes/message.js');
const Command = require('../classes/command.js');


describe("Rover class", function() {

  it("should set position and default values for mode and generatorWatts", function() {
    const rover = new Rover("121500");
    assert.strictEqual(rover.position, "121500");
    assert.strictEqual(rover.generatorWatts, 110);
  });

  it("should return name of message when calling receiveMessage method", function() {
    const rover = new Rover("745");
    const message = new Message("e1"
                              , [new Command('MODE_CHANGE', 'LOW_POWER')]);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.name, message.name);
  });

  it("should return two results if two commands are sent in message", function() {
    const rover = new Rover("777");
    const message = new Message("e1"
                              , [new Command('MODE_CHANGE', 'LOW_POWER')
                              , new Command('STATUS_CHECK')]);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, message.commands.length);
  });

  it("should respond correctly to status check", function() {
    const rover = new Rover("121500", ["Liftoff"]);
    const message = new Message("e1"
                              , [new Command('STATUS_CHECK')]);
    let response = rover.receiveMessage(message);
    let status = {completed: true,
                  mode: rover.mode,
                  generatorWatts: rover.generatorWatts,
                  position: rover.position
                  };
    let idx;
    for (let i in message.commands) {
      if (message.commands[i].commandType === 'STATUS_CHECK') { 
        idx = i;
        break;
        }
    }
    assert.deepStrictEqual(response.results[idx], status);
  });

  it("should respond with correct status after MODE_CHANGE", function() {
      const rover = new Rover("32500");
      const message = new Message("e1"
                                , [new Command('MODE_CHANGE', "LOW_POWER")]
                                );
      let response = rover.receiveMessage(message);
      assert.strictEqual(response.results[0].completed, true);
      assert.strictEqual(rover.mode, "LOW_POWER");
  });

  it("should respond with false completed value if attempt to move while in LOW_POWER mode", function() {
      const rover = new Rover("32500");
      const message = new Message("e1"
                               , [ new Command('MODE_CHANGE', "LOW_POWER"),
                                 new Command('MOVE', 25000) ]
                                 );
      let response = rover.receiveMessage(message);
      assert.strictEqual(response.results[1].completed, false);
  });

  it("should respond with position for move command", function() {
      const rover = new Rover("2642");
      const message = new Message("e1", [new Command('MOVE', 12000)]);
      let response = rover.receiveMessage(message);
      assert.strictEqual(rover.position, 12000);
  });

  it("should respond with completed false and a message for an unknown command", function() {
      const rover = new Rover("100");
      const message = new Message("e1"
                                , [new Command('DETONATE', 12000)]);
      let response = rover.receiveMessage(message);
      assert.strictEqual(response.results[0].completed, false);
      assert.strictEqual(response.results[0].message, 'UNKNOWN COMMAND');
  });

});